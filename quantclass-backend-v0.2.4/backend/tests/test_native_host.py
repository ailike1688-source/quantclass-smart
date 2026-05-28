import unittest
from pathlib import Path
from tempfile import TemporaryDirectory
from unittest.mock import patch
from unittest.mock import Mock

from native_host import quantclass_native_host as host


class NativeHostTests(unittest.TestCase):
    def test_handle_request_returns_existing_healthy_backend_without_launch(self):
        health_check = Mock(return_value=True)
        launch_backend = Mock()

        result = host.handle_request(
            {"action": "startBackend"},
            health_check=health_check,
            launch_backend=launch_backend,
            sleep=lambda _: None,
            timeout_seconds=1,
            poll_interval=0,
        )

        self.assertTrue(result["success"])
        self.assertTrue(result["healthy"])
        self.assertFalse(result["started"])
        self.assertEqual(result["backendUrl"], "http://127.0.0.1:8700")
        health_check.assert_called_once()
        launch_backend.assert_not_called()

    def test_handle_request_starts_backend_when_health_initially_down(self):
        states = iter([False, False, True])
        health_check = Mock(side_effect=lambda: next(states))
        launch_backend = Mock(return_value={"pid": 1234})

        result = host.handle_request(
            {"action": "startBackend"},
            health_check=health_check,
            launch_backend=launch_backend,
            sleep=lambda _: None,
            timeout_seconds=1,
            poll_interval=0,
        )

        self.assertTrue(result["success"])
        self.assertTrue(result["healthy"])
        self.assertTrue(result["started"])
        self.assertEqual(result["pid"], 1234)
        self.assertEqual(health_check.call_count, 3)
        launch_backend.assert_called_once()

    def test_handle_request_reports_error_when_backend_does_not_become_healthy(self):
        health_check = Mock(return_value=False)
        launch_backend = Mock(return_value={"pid": 1234})

        result = host.handle_request(
            {"action": "startBackend"},
            health_check=health_check,
            launch_backend=launch_backend,
            sleep=lambda _: None,
            timeout_seconds=0,
            poll_interval=0,
        )

        self.assertFalse(result["success"])
        self.assertFalse(result["healthy"])
        self.assertTrue(result["started"])
        self.assertIn("Backend did not become healthy", result["error"])
        launch_backend.assert_called_once()

    def test_start_backend_visible_detaches_backend_process_from_native_pipe(self):
        with TemporaryDirectory() as temp_dir:
            root = Path(temp_dir)
            python_exe = root / "venv" / "Scripts" / "python.exe"
            main_py = root / "main.py"
            python_exe.parent.mkdir(parents=True)
            python_exe.write_text("", encoding="utf-8")
            main_py.write_text("", encoding="utf-8")

            with patch.object(host, "backend_dir", return_value=root), \
                    patch.object(host, "python_exe", return_value=python_exe), \
                    patch.object(host, "main_py", return_value=main_py), \
                    patch.object(host.subprocess, "Popen") as popen:
                popen.return_value.pid = 5678

                result = host.start_backend_visible()

        self.assertEqual(result["pid"], 5678)
        args, kwargs = popen.call_args
        self.assertEqual(args[0][:4], ["cmd.exe", "/c", "start", "QuantClass Backend"])
        self.assertIs(kwargs["stdin"], host.subprocess.DEVNULL)
        self.assertIs(kwargs["stdout"], host.subprocess.DEVNULL)
        self.assertIs(kwargs["stderr"], host.subprocess.DEVNULL)


if __name__ == "__main__":
    unittest.main()
