import type { Metadata } from "next";
import "./globals.css";

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
        <html lang="en">
            <body className="p-0 m-0 block min-h-screen min-w-screen bg-primary-100">
                {children}
            </body>
        </html>
    );
}
