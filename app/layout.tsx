import { ThemeProvider } from "@/provider/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { CSPostHogProvider } from "@/provider/posthog-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const DMSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: "Magage your shifts with ease",
  icons: {
    icon: [
      { url: "/favicon/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon.ico" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
  },
  other: {
    "apple-mobile-web-app-title": "VitalSync",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${DMSans.className} ${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CSPostHogProvider>
            {children}
            <Toaster />
          </CSPostHogProvider>
        </ThemeProvider>
        <script src="https://unpkg.com/react-scan/dist/auto.global.js" defer></script>
        <Script type="speculationrules" id="prerender-rules">
          {`
            {
              "prerender": [
                {
                  "where": {
                    "and": [
                      { "href_matches": "/*" },
                      { "not": { "selector_matches": ".no-prerender" } },
                      { "not": { "selector_matches": "[rel~=nofollow]" } }
                    ]
                  },
                  "eagerness": "moderate"
                }
              ]
            }
          `}
        </Script>
      </body>
    </html>
  );
}
