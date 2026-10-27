using System;
using System.Diagnostics;
using System.IO;
using System.Windows.Forms;

namespace VGT.Mediacenter {
    static class Program {
        [STAThread]
        static void Main() {
            try {
                string baseDir = AppDomain.CurrentDomain.BaseDirectory;
                string wailsExe = Path.Combine(baseDir, "VGT-Mediacenter-Supreme.exe");
                if (File.Exists(wailsExe)) {
                    Process.Start(new ProcessStartInfo {
                        FileName = wailsExe,
                        UseShellExecute = true
                    });
                    return;
                }

                string indexPath = Path.Combine(baseDir, "frontend", "index.html");
                if (!File.Exists(indexPath)) {
                    indexPath = Path.Combine(baseDir, "index.html");
                }
                if (!File.Exists(indexPath)) {
                    MessageBox.Show("index.html wurde nicht gefunden in:\n" + baseDir, "VGT Mediacenter", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    return;
                }

                string fileUri = new Uri(indexPath).AbsoluteUri;
                string userData = Path.Combine(Path.GetTempPath(), "vgt_mediacenter_profile");

                // Check Edge paths
                string edgePath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFilesX86), @"Microsoft\Edge\Application\msedge.exe");
                if (!File.Exists(edgePath)) {
                    edgePath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles), @"Microsoft\Edge\Application\msedge.exe");
                }

                if (File.Exists(edgePath)) {
                    ProcessStartInfo psi = new ProcessStartInfo {
                        FileName = edgePath,
                        Arguments = string.Format("--app=\"{0}\" --user-data-dir=\"{1}\" --window-size=1440,920 --disable-features=Translate", fileUri, userData),
                        UseShellExecute = false
                    };
                    Process.Start(psi);
                    return;
                }

                // Fallback to default browser
                Process.Start(new ProcessStartInfo {
                    FileName = fileUri,
                    UseShellExecute = true
                });
            } catch (Exception ex) {
                MessageBox.Show("Fehler beim Starten von VGT Mediacenter:\n" + ex.Message, "VGT Mediacenter", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
    }
}
