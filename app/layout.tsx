import "./globals.css";
import AppProviders from "../components/AppProviders";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}