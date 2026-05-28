import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


class LocalInstallerTests(unittest.TestCase):
    def test_installer_script_exposes_safe_one_command_setup(self):
        script = ROOT / "install-local.ps1"
        self.assertTrue(script.exists())
        text = script.read_text(encoding="utf-8")
        self.assertIn("[ValidatePattern('^[a-p]{32}$')]", text)
        self.assertIn("$ExtensionId", text)
        self.assertIn("install-native-host.ps1", text)
        self.assertIn("pip install", text)
        self.assertIn("Read-Host", text)
        self.assertIn("Native Messaging", text)

    def test_uninstaller_preserves_user_data_and_removes_native_host(self):
        script = ROOT / "uninstall-local.ps1"
        self.assertTrue(script.exists())
        text = script.read_text(encoding="utf-8")
        self.assertIn("uninstall-native-host.ps1", text)
        self.assertIn("preserved", text.lower())
        self.assertNotIn("Remove-Item -Recurse -Force $BackendDir", text)
        self.assertNotIn("Remove-Item -Recurse -Force $VenvDir", text)

    def test_install_documentation_points_to_shortcut_installer(self):
        doc = ROOT / "INSTALL.md"
        self.assertTrue(doc.exists())
        text = doc.read_text(encoding="utf-8")
        self.assertIn(".\\install-local.ps1 -ExtensionId <EXTENSION_ID>", text)
        self.assertIn("chrome://extensions", text)
        self.assertIn("PyPI", text)
        self.assertIn(".\\uninstall-local.ps1", text)


if __name__ == "__main__":
    unittest.main()
