import 'modern-normalize';
import './globals.css';
import Header from '@/components/Header/Header';
import GeolocationChecker from '@/components/GeolocationChecker/GeolocationChecker';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <GeolocationChecker />
        {children}
      </body>
    </html>
  );
}
