import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/lib/language-context";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "FCI Regulations Assistant | مساعد لوائح كلية الحاسبات",
  description: "Bilingual chatbot for Faculty of Computers & Information regulations at Menofia University",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${cairo.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
