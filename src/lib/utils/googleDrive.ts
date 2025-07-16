import { google } from "googleapis";
import { JWT } from "google-auth-library";

let driveClient: any;

export function getDriveClient() {
  if (driveClient) return driveClient;

  const serviceAccountBase64 = process.env.GOOGLE_SERVICE_ACCOUNT_BASE64;
  if (!serviceAccountBase64) throw new Error("Service account env not set");

  const json = JSON.parse(
    Buffer.from(serviceAccountBase64, "base64").toString("utf8")
  );

  const auth = new google.auth.JWT({
    email: json.client_email,
    key: json.private_key,
    scopes: ["https://www.googleapis.com/auth/drive"],
  });

  const drive = google.drive({
    version: "v3",
    auth,
    // 👉 Tambahkan ini
    headers: {
      "User-Agent": "my-app",
    },
  });

  driveClient = drive;
  return drive;
}
