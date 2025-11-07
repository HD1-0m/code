import "./globals.css";

export const metadata = {
  title: "ERP System",
  description: "School ERP built with Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
