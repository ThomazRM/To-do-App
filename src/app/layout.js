import "./globals.css";
import { Providers } from "@/store/store";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
