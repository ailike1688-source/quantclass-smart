# QuantClass Smart 快捷安装指南

本指南适用于 Windows 本地安装。

## 1. 加载 Chrome 插件

1. 打开 Chrome：`chrome://extensions`
2. 打开右上角“开发者模式”
3. 点击“加载未打包的扩展程序”
4. 选择目录：

```text
quantclass-smart-v0.2.4/extension
```

5. 复制插件 ID，后面用 `<EXTENSION_ID>` 表示。

## 2. 运行快捷安装器

在项目根目录运行：

```powershell
.\install-local.ps1 -ExtensionId <EXTENSION_ID>
```

安装器会执行以下步骤：

- 检查 Python
- 创建后端虚拟环境 `quantclass-backend-v0.2.4/backend/venv`
- 检查后端依赖
- 在访问 PyPI 和修改本地 `venv` 前提示你确认
- 安装 `requirements.txt` 中的依赖
- 注册 Chrome Native Messaging Host
- 运行 Native Host 单元测试

如果你只想检查并注册，不希望安装器自动安装依赖，可以运行：

```powershell
.\install-local.ps1 -ExtensionId <EXTENSION_ID> -SkipDependencyInstall
```

## 3. 重新加载插件

安装完成后：

1. 打开 `chrome://extensions`
2. 找到 QuantClass Smart
3. 点击“重新加载”
4. 点击插件图标或打开侧边栏

后端未运行时，插件会通过 Native Messaging 自动启动本地后端。

## 4. 验证后端

```powershell
curl.exe http://127.0.0.1:8700/api/health
```

成功时返回内容包含：

```json
{
  "code": 0,
  "message": "success"
}
```

## 5. 卸载本地注册

如果只想移除 Chrome Native Messaging 注册：

```powershell
.\uninstall-local.ps1
```

卸载器不会删除：

- 源码
- `venv`
- 本地数据库
- 知识库文件
- 用户数据

## 6. 常见问题

### PowerShell 阻止脚本运行

可以用：

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\install-local.ps1 -ExtensionId <EXTENSION_ID>
```

### 插件 ID 变了

如果你删除并重新加载了插件，Chrome 可能生成新的插件 ID。请用新的 ID 重新运行：

```powershell
.\install-local.ps1 -ExtensionId <NEW_EXTENSION_ID>
```

### 后端没有自动启动

检查：

- 是否已经重新加载插件
- 是否已经运行 `install-local.ps1`
- `chrome://extensions` 里插件 ID 是否与安装时传入的一致
- `http://127.0.0.1:8700/api/health` 是否可访问
