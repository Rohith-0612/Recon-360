import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { NavBar } from "@/components/nav-bar";
import { TopBar } from "@/components/top-bar";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Recon 360 — Client Health",
  description: "Reconciled Salesforce + usage_billing + invoicing view of client health.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}",
          }}
        />
      </head>
      <body className="min-h-full">
        <Providers>
          <div className="flex min-h-screen">
            <NavBar />
            <div className="flex min-w-0 flex-1 flex-col">
              <TopBar />
              <div className="min-w-0 flex-1 px-6 pt-4 pb-16">{children}</div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
