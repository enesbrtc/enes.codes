import "./globals.css";
import AppProviders from "../components/AppProviders";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-950 text-neutral-100">
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}