# QuantClass Smart Native Messaging Launcher Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make clicking the Chrome extension icon start the local QuantClass backend through Chrome Native Messaging.

**Architecture:** Add a small Python Native Messaging host that checks `/api/health` and starts `main.py` when needed. Register it with Chrome through a PowerShell installer. Patch the existing extension manifest and service worker with the minimum required native messaging and side panel behavior.

**Tech Stack:** Chrome Extension MV3, Chrome Native Messaging, Python 3.12, FastAPI backend, PowerShell registry scripts, pytest.

---

## File Structure

- Create `quantclass-backend-v0.2.4/backend/native_host/quantclass_native_host.py`: Native Messaging protocol handler and backend launcher.
- Create `quantclass-backend-v0.2.4/backend/native_host/quantclass_native_host.cmd`: Windows wrapper invoked by Chrome.
- Create `quantclass-backend-v0.2.4/backend/native_host/install-native-host.ps1`: Registers Chrome native host for the current extension ID.
- Create `quantclass-backend-v0.2.4/backend/native_host/uninstall-native-host.ps1`: Removes the registry entry.
- Create `quantclass-backend-v0.2.4/backend/tests/test_native_host.py`: Unit tests for health handling and launch decisions.
- Modify `quantclass-smart-v0.2.4/extension/manifest.json`: Add `nativeMessaging` permission.
- Modify `quantclass-smart-v0.2.4/extension/build/service-worker.js`: Replace the placeholder action click listener with side panel open plus backend startup.

## Task 1: Native Host Core

**Files:**
- Create: `e:/quantclass-smart/quantclass-backend-v0.2.4/backend/native_host/quantclass_native_host.py`
- Create: `e:/quantclass-smart/quantclass-backend-v0.2.4/backend/tests/test_native_host.py`

- [ ] **Step 1: Write failing tests**

Create tests that verify `handle_request` returns healthy when the backend is already healthy and starts the backend only when health check fails.

- [ ] **Step 2: Run tests and verify they fail**

Run: `./venv/Scripts/python.exe -m pytest tests/test_native_host.py -v`

Expected: fails because `native_host.quantclass_native_host` does not exist.

- [ ] **Step 3: Implement native host core**

Implement message reading/writing, health check, backend launch, polling, and request handling.

- [ ] **Step 4: Run tests and verify they pass**

Run: `./venv/Scripts/python.exe -m pytest tests/test_native_host.py -v`

Expected: all tests pass.

## Task 2: Windows Registration Scripts

**Files:**
- Create: `e:/quantclass-smart/quantclass-backend-v0.2.4/backend/native_host/quantclass_native_host.cmd`
- Create: `e:/quantclass-smart/quantclass-backend-v0.2.4/backend/native_host/install-native-host.ps1`
- Create: `e:/quantclass-smart/quantclass-backend-v0.2.4/backend/native_host/uninstall-native-host.ps1`

- [ ] **Step 1: Add `.cmd` wrapper**

The wrapper runs the backend virtualenv Python interpreter against `quantclass_native_host.py`.

- [ ] **Step 2: Add installer**

The installer accepts `-ExtensionId`, writes `com.quantclass.smart.launcher.json`, and registers it under HKCU.

- [ ] **Step 3: Add uninstaller**

The uninstaller removes the HKCU registry key.

- [ ] **Step 4: Smoke-check scripts**

Run PowerShell syntax checks with `-NoProfile -ExecutionPolicy Bypass`.

## Task 3: Extension Patch

**Files:**
- Modify: `e:/quantclass-smart/quantclass-smart-v0.2.4/extension/manifest.json`
- Modify: `e:/quantclass-smart/quantclass-smart-v0.2.4/extension/build/service-worker.js`

- [ ] **Step 1: Add `nativeMessaging` permission**

Update manifest permissions without changing existing permissions.

- [ ] **Step 2: Patch action click behavior**

On action click, open the side panel and ensure the backend is running through Native Messaging.

- [ ] **Step 3: Validate JSON and service worker syntax**

Run JSON parsing and a syntax-only JavaScript check.

## Task 4: Local Installation and Verification

**Files:**
- Use created scripts and modified extension files.

- [ ] **Step 1: Ask user for extension ID**

Get the ID from `chrome://extensions` for the unpacked QuantClass Smart extension.

- [ ] **Step 2: Register native host**

Run: `powershell -NoProfile -ExecutionPolicy Bypass -File native_host/install-native-host.ps1 -ExtensionId <id>`

- [ ] **Step 3: Reload Chrome extension**

Reload the unpacked extension in `chrome://extensions`.

- [ ] **Step 4: Verify click startup**

Stop backend, click extension icon, confirm backend console opens, confirm `/api/health` succeeds, and confirm the side panel can call backend APIs.

## Self-Review

- Spec coverage: Native host, installer, extension permission, click flow, and manual testing are covered.
- Placeholder scan: No implementation placeholders are left for unsupported behavior; the extension ID is explicitly collected during local installation because Chrome requires exact `allowed_origins`.
- Type consistency: Native host action is consistently named `startBackend`; host name is consistently `com.quantclass.smart.launcher`.
