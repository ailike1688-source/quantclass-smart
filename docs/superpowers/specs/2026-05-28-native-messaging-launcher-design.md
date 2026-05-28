# QuantClass Smart Native Messaging Launcher Design

## Goal

Make the Chrome extension start the local QuantClass backend when the user clicks the extension icon, instead of requiring the user to manually run `python main.py` first.

The first implementation targets this Windows machine. The structure must also support later packaging for other users.

## Constraints

Chrome extensions cannot directly execute local programs. The implementation must use Chrome Native Messaging.

The existing extension package only contains built artifacts under `quantclass-smart-v0.2.4/extension/build`; there is no TypeScript or bundler source available. Changes to extension behavior will therefore be made against the current extension files, with minimal edits.

The backend is a FastAPI application at `quantclass-backend-v0.2.4/backend/main.py`. It listens on `127.0.0.1:8700` and exposes `/api/health`.

## Architecture

The system will have four parts:

1. Chrome extension side panel and service worker.
2. Chrome Native Messaging host registration.
3. A local native host launcher script.
4. The existing QuantClass FastAPI backend.

Click flow:

```text
User clicks extension icon
  -> service worker checks backend health
  -> if backend is down, service worker sends a Native Messaging request
  -> native host starts the backend in a visible console window
  -> service worker waits for /api/health
  -> service worker opens the side panel
```

## Native Host

A new native host script will live under the backend package, for example:

```text
quantclass-backend-v0.2.4/backend/native_host/quantclass_native_host.py
```

Responsibilities:

- Read one Native Messaging request from stdin.
- Support a `startBackend` action.
- Check whether `http://127.0.0.1:8700/api/health` is already healthy.
- If healthy, return `started: false` and `healthy: true`.
- If not healthy, launch the backend by running `venv\Scripts\python.exe main.py` from the backend directory.
- Start the backend in a visible console window for the first version.
- Poll `/api/health` for a short timeout.
- Return structured success or error JSON to Chrome.

## Windows Registration

Add scripts under a native host or scripts directory:

```text
install-native-host.ps1
uninstall-native-host.ps1
```

The install script will:

- Resolve the project path dynamically.
- Create the Native Messaging host manifest JSON.
- Register it under `HKCU\Software\Google\Chrome\NativeMessagingHosts\com.quantclass.smart.launcher`.
- Use the current extension ID in the manifest `allowed_origins`.

The uninstall script will remove the registry key.

## Extension Changes

Update `manifest.json` to add the `nativeMessaging` permission.

Update `build/service-worker.js` with minimal changes:

- Add a click handler for `chrome.action.onClicked`.
- On click, call backend health check first.
- If health check fails, call `chrome.runtime.sendNativeMessage('com.quantclass.smart.launcher', ...)`.
- Wait briefly for backend health.
- Open the side panel using Chrome side panel APIs.
- If Native Messaging fails, still open the side panel so the user can see the existing error state.

The implementation should avoid rewriting the minified bundle broadly.

## Error Handling

Native host response should include:

- `success`
- `healthy`
- `started`
- `error`, if any
- `backendUrl`

Failure cases:

- Python executable missing.
- Backend `main.py` missing.
- Port `8700` occupied by a non-QuantClass service.
- Backend starts but `/api/health` does not become healthy in time.
- Native host is not registered.

For the first version, visible console output is acceptable. Later packaging can switch to silent mode with log files.

## Testing

Manual verification steps:

1. Stop any running backend.
2. Install/register the native host.
3. Reload the unpacked extension in Chrome.
4. Click the extension icon.
5. Confirm a backend console window appears.
6. Confirm `http://127.0.0.1:8700/api/health` returns success.
7. Confirm the side panel opens and no longer shows `Failed to fetch`.
8. Click the extension again while backend is already running and confirm it does not start a duplicate backend.

## Distribution Path

Phase 1 uses the existing local Python virtual environment.

Phase 2 can package the native host as an executable and make the install script path-independent for other users.
