import "./globals.css";
import AppProviders from "../components/AppProviders";
import BezosAudioSystem from "../components/BezosAudioSystem";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="flex min-h-screen flex-col bg-background text-foreground">
        <AppProviders>
          <main className="flex-1 pt-20 pb-4">{children}</main>
        </AppProviders>
        <BezosAudioSystem />
      </body>
    </html>
  );
}