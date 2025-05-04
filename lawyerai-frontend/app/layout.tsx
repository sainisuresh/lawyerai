import "../styles/globals.css";
import "@fontsource/inter"; // This imports the default Inter font

import { AuthProvider } from "../context/AuthContext";

export const metadata = {
  title: "LawyerAI",
  description: "AI-Powered Legal Assistant",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

