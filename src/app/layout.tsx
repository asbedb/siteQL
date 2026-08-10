import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { Providers } from "./providers";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
// export const instant = false;

export const metadata: Metadata = {
    title: "siteQL",
    description: "Update and Deploy your SQL WebApps with Ease",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
            <body className="p-0 m-0 block min-h-screen min-w-screen bg-primary-100">
                <Providers>{children}</Providers>
                <Toaster richColors />
            </body>
        </html>
    );
}
