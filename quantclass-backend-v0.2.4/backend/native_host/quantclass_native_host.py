import json
import os
import struct
import subprocess
import sys
import time
from pathlib import Path
from urllib.error import URLError
from urllib.request import urlopen

BACKEND_URL = "http://127.0.0.1:8700"
HEALTH_URL = f"{BACKEND_URL}/api/health"
HOST_NAME = "com.quantclass.smart.launcher"


def backend_dir():
    return Path(__file__).resolve().parents[1]


def python_exe():
    return backend_dir() / "venv" / "Scripts" / "python.exe"


def main_py():
    return backend_dir() / "main.py"


def is_backend_healthy(url=HEALTH_URL, timeout=2):
    try:
        with urlopen(url, timeout=timeout) as response:
            if response.status != 200:
                return False
            payload = json.loads(response.read().decode("utf-8"))
            return payload.get("code") == 0 and payload.get("data", {}).get("status") == "healthy"
    except (OSError, URLError, json.JSONDecodeError):
        return False


def start_backend_visible():
    exe = python_exe()
    app = main_py()
    if not exe.exists():
        raise FileNotFoundError(f"Python executable not found: {exe}")
    if not app.exists():
        raise FileNotFoundError(f"Backend entry not found: {app}")

    if os.name == "nt":
        command = ["cmd.exe", "/c", "start", "QuantClass Backend", str(exe), str(app)]
        creationflags = subprocess.CREATE_NO_WINDOW
    else:
        command = [str(exe), str(app)]
        creationflags = 0

    process = subprocess.Popen(
        command,
        cwd=str(backend_dir()),
        stdin=subprocess.DEVNULL,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        creationflags=creationflags,
    )
    return {"pid": process.pid}


def wait_for_backend(health_check=is_backend_healthy, sleep=time.sleep, timeout_seconds=15, poll_interval=0.5):
    deadline = time.monotonic() + timeout_seconds
    while True:
        if health_check():
            return True
        if time.monotonic() >= deadline:
            return False
        sleep(poll_interval)


def handle_request(request, health_check=is_backend_healthy, launch_backend=start_backend_visible, sleep=time.sleep, timeout_seconds=15, poll_interval=0.5):
    action = request.get("action")
    if action != "startBackend":
        return {
            "success": False,
            "healthy": False,
            "started": False,
            "backendUrl": BACKEND_URL,
            "error": f"Unsupported action: {action}",
        }

    if health_check():
        return {
            "success": True,
            "healthy": True,
            "started": False,
            "backendUrl": BACKEND_URL,
        }

    try:
        launch_info = launch_backend()
    except Exception as exc:
        return {
            "success": False,
            "healthy": False,
            "started": False,
            "backendUrl": BACKEND_URL,
            "error": str(exc),
        }

    healthy = wait_for_backend(
        health_check=health_check,
        sleep=sleep,
        timeout_seconds=timeout_seconds,
        poll_interval=poll_interval,
    )
    result = {
        "success": healthy,
        "healthy": healthy,
        "started": True,
        "backendUrl": BACKEND_URL,
        **launch_info,
    }
    if not healthy:
        result["error"] = "Backend did not become healthy in time"
    return result


def read_message(stream=sys.stdin.buffer):
    raw_length = stream.read(4)
    if len(raw_length) == 0:
        return None
    if len(raw_length) != 4:
        raise ValueError("Invalid Native Messaging message length")
    message_length = struct.unpack("<I", raw_length)[0]
    payload = stream.read(message_length)
    if len(payload) != message_length:
        raise ValueError("Incomplete Native Messaging message")
    return json.loads(payload.decode("utf-8"))


def write_message(message, stream=sys.stdout.buffer):
    payload = json.dumps(message, ensure_ascii=False).encode("utf-8")
    stream.write(struct.pack("<I", len(payload)))
    stream.write(payload)
    stream.flush()


def main():
    try:
        request = read_message()
        if request is None:
            return 0
        write_message(handle_request(request))
        return 0
    except Exception as exc:
        write_message({
            "success": False,
            "healthy": False,
            "started": False,
            "backendUrl": BACKEND_URL,
            "error": str(exc),
        })
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
