# QuantClass Smart Local Installer Design

## Goal

Make local setup easier for Windows users by adding root-level installer scripts. A user should be able to load the Chrome extension, copy the extension ID, run one PowerShell installer, reload the extension, and then use QuantClass Smart with automatic backend startup.

## Scope

Create:

- `install-local.ps1`
- `uninstall-local.ps1`
- `INSTALL.md`
- README updates that point users to the shortcut installer

Do not build a packaged desktop installer yet. Do not silently modify system state without explaining what will change.

## Installer behavior

`install-local.ps1 -ExtensionId <EXTENSION_ID>` will:

1. Validate the extension ID format.
2. Locate the backend directory from the script location.
3. Check Python availability.
4. Create `quantclass-backend-v0.2.4/backend/venv` if it is missing.
5. If dependency installation is needed, print a clear prompt before accessing PyPI or modifying the local venv.
6. Install backend requirements after user confirmation.
7. Register the Chrome Native Messaging host by invoking `backend/native_host/install-native-host.ps1`.
8. Run syntax and smoke checks where possible.
9. Print the final manual step: reload QuantClass Smart in `chrome://extensions`.

## Uninstaller behavior

`uninstall-local.ps1` will:

1. Call `backend/native_host/uninstall-native-host.ps1`.
2. Leave source files, database files, knowledge files, and `venv` untouched.
3. Print what was removed and what was intentionally preserved.

## Safety model

- Dependency installation must ask for confirmation before network access.
- The installer must not delete user data.
- The uninstaller must not remove source code, local databases, or virtual environments.
- The generated Native Messaging manifest remains local-only and is ignored by Git.

## Verification

Implementation should pass:

- PowerShell parser syntax checks for installer scripts.
- Existing Native Host unit tests.
- JavaScript syntax checks for extension bundles.
- Git ignore checks confirming local database, venv, local Native Host manifest, and screenshots are not tracked.
