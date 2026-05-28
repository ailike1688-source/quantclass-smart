# QuantClass Smart

QuantClass Smart 是一个本地 Chrome 扩展助手，包含浏览器侧边栏插件和本地 FastAPI 后端。插件负责网页交互、聊天、PDF、历史和知识库界面；后端负责模型调用、数据存储、Agent、技能和记忆等能力。

## 项目结构

```text
quantclass-smart/
├── quantclass-smart-v0.2.4/
│   └── extension/                 # Chrome MV3 插件目录
├── quantclass-backend-v0.2.4/
│   └── backend/                   # FastAPI 本地后端
│       ├── main.py                # 后端入口
│       ├── requirements.txt       # Python 依赖
│       ├── native_host/           # Chrome Native Messaging 启动器
│       └── tests/                 # 后端测试
├── docs/                          # 设计和实施文档
├── agents/                        # Agent 角色定义
├── knowledge/                     # 本地知识库目录
└── quantclass.db                  # 本地 SQLite 数据库
```

## 运行环境

- Windows
- Chrome 或 Chromium 内核浏览器
- Python 3.10+
- 当前后端虚拟环境路径：`quantclass-backend-v0.2.4/backend/venv`
- 默认后端地址：`http://127.0.0.1:8700`
- 健康检查地址：`http://127.0.0.1:8700/api/health`

## 手动启动后端

如果只想手动运行后端：

```powershell
cd quantclass-backend-v0.2.4/backend
.\venv\Scripts\python.exe main.py
```

验证后端：

```powershell
curl.exe http://127.0.0.1:8700/api/health
```

正常响应应包含：

```json
{
  "code": 0,
  "message": "success"
}
```

## 安装 Chrome 插件

1. 打开 Chrome：`chrome://extensions`
2. 打开右上角“开发者模式”
3. 点击“加载未打包的扩展程序”
4. 选择目录：

```text
quantclass-smart-v0.2.4/extension
```

加载后，确认插件 ID。下面用 `<EXTENSION_ID>` 表示你在 `chrome://extensions` 里看到的 32 位插件 ID：

```text
<EXTENSION_ID>
```

如果删除插件后重新加载，Chrome 可能会生成新的 ID，需要重新注册 Native Messaging Host。

## 点击插件自动启动后端

当前版本已支持通过 Chrome Native Messaging 自动启动本地后端。用户点击插件图标或打开侧边栏时，插件会向 Native Host 发送启动请求：

```text
com.quantclass.smart.launcher
```

Native Host 会先检查：

```text
http://127.0.0.1:8700/api/health
```

如果后端已运行，则不会重复启动；如果后端未运行，则会打开一个新的后端命令行窗口并运行：

```powershell
.\venv\Scripts\python.exe main.py
```

## 注册 Native Messaging Host

进入后端目录：

```powershell
cd quantclass-backend-v0.2.4/backend
```

用 Chrome 扩展 ID 注册 Native Host：

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\native_host\install-native-host.ps1 -ExtensionId <EXTENSION_ID>
```

注册后会生成：

```text
quantclass-backend-v0.2.4/backend/native_host/com.quantclass.smart.launcher.json
```

并写入当前用户注册表：

```text
HKCU\Software\Google\Chrome\NativeMessagingHosts\com.quantclass.smart.launcher
```

注册文件中的 `allowed_origins` 必须与 Chrome 扩展 ID 一致：

```json
"allowed_origins": [
  "chrome-extension://<EXTENSION_ID>/"
]
```

## 卸载 Native Messaging Host

```powershell
cd quantclass-backend-v0.2.4/backend
powershell -NoProfile -ExecutionPolicy Bypass -File .\native_host\uninstall-native-host.ps1
```

## 更新插件后必须重新加载

修改以下文件后，需要在 `chrome://extensions` 页面点击 QuantClass Smart 的“重新加载”：

```text
quantclass-smart-v0.2.4/extension/manifest.json
quantclass-smart-v0.2.4/extension/build/service-worker.js
quantclass-smart-v0.2.4/extension/build/popup.js
```

否则 Chrome 仍会使用旧的 service worker 或旧侧边栏代码。

## 验证自动启动

1. 先停止所有正在运行的后端窗口
2. 确认 `http://127.0.0.1:8700/api/health` 无法访问
3. 在 `chrome://extensions` 重新加载 QuantClass Smart
4. 点击插件图标或打开侧边栏
5. 预期会弹出一个新的后端命令行窗口
6. 再访问：

```powershell
curl.exe http://127.0.0.1:8700/api/health
```

如果返回 `code: 0`，说明自动启动成功。

## Native Host 本地协议测试

不经过 Chrome，直接模拟 Native Messaging 请求：

```powershell
cd quantclass-backend-v0.2.4/backend
.\venv\Scripts\python.exe -c "import json,struct,subprocess; msg=json.dumps({'action':'startBackend'}).encode(); p=subprocess.run(['native_host\\quantclass_native_host.cmd'],input=struct.pack('<I',len(msg))+msg,stdout=subprocess.PIPE,stderr=subprocess.PIPE,timeout=25); n=struct.unpack('<I',p.stdout[:4])[0]; print(json.loads(p.stdout[4:4+n].decode()))"
```

成功时会返回类似：

```json
{
  "success": true,
  "healthy": true,
  "started": true,
  "backendUrl": "http://127.0.0.1:8700"
}
```

如果后端已经运行，`started` 会是 `false`，这是正常行为。

## 测试

当前虚拟环境未安装 `pytest` 时，可以使用标准库 `unittest` 验证 Native Host 核心逻辑：

```powershell
cd quantclass-backend-v0.2.4/backend
.\venv\Scripts\python.exe -m unittest tests.test_native_host -v
```

## 故障排查

### 插件显示 `Failed to fetch`

先检查后端是否运行：

```powershell
curl.exe http://127.0.0.1:8700/api/health
```

如果无法访问，说明后端没有启动。请检查：

- Chrome 插件是否已经重新加载
- Native Host 是否已经注册
- `allowed_origins` 中的扩展 ID 是否与 `chrome://extensions` 里的 ID 一致
- 后端虚拟环境是否存在：`quantclass-backend-v0.2.4/backend/venv/Scripts/python.exe`

### 修改后点击插件没有反应

打开 `chrome://extensions`，点击 QuantClass Smart 下方的 `Service Worker`，查看控制台是否有类似错误：

```text
Native host has exited
Specified native messaging host not found
Access to the native messaging host is forbidden
```

常见原因：

- 没有执行 `install-native-host.ps1`
- 扩展 ID 变了，但没有重新注册
- `manifest.json` 没有 `nativeMessaging` 权限
- 修改插件代码后没有重新加载扩展

### 后端窗口启动后马上关闭

手动启动后端查看错误：

```powershell
cd quantclass-backend-v0.2.4/backend
.\venv\Scripts\python.exe main.py
```

常见原因：

- Python 依赖缺失
- `8700` 端口被其它程序占用
- 配置文件或数据库初始化失败

## 相关文件

- `quantclass-smart-v0.2.4/extension/manifest.json`
- `quantclass-smart-v0.2.4/extension/build/service-worker.js`
- `quantclass-smart-v0.2.4/extension/build/popup.js`
- `quantclass-backend-v0.2.4/backend/native_host/quantclass_native_host.py`
- `quantclass-backend-v0.2.4/backend/native_host/quantclass_native_host.cmd`
- `quantclass-backend-v0.2.4/backend/native_host/install-native-host.ps1`
- `quantclass-backend-v0.2.4/backend/native_host/uninstall-native-host.ps1`
- `quantclass-backend-v0.2.4/backend/tests/test_native_host.py`
