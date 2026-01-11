import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import I18nProvider from "../../providers/I18nProvider";
import { ReactNode } from "react";
import initTranslations, { i18nNamespaces } from "../../i18n/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lookup | Financial Company",
  description:
    "Search and explore trusted financial companies with profiles, services, and key business information.",
  openGraph: {
    title: "Lookup | Financial Company",
    description:
      "Search and explore trusted financial companies with profiles, services, and key business information.",
    siteName: "Lookup",
    type: "website",
  },
};

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'th' },
  ];
}

interface LayoutProps {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

const Layout = async ({ children, params }: LayoutProps) => {
  const { locale } = await params;
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <I18nProvider
          namespaces={i18nNamespaces}
          locale={locale}
          resources={resources}
        >
          {children}
        </I18nProvider>
      </body>
    </html>
  );
};

export default Layout;