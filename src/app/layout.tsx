import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {Theme} from "@/Theme";
import {Navbar} from "@/Navbar";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Multi Modal Monkey",
    description: "Created by monkeys for monkeys",
};


export default function RootLayout(
    {
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>) {
    return (
        <html lang="en">
        <body style={{
            backgroundColor: "#0E1822",
            margin: 0,
            padding: 0,
            backgroundImage: "url('https://aeiljuispo.cloudimg.io/v7/https://cdn-uploads.huggingface.co/production/uploads/6424f01ea4f3051f54dbbd85/oqVQ04b5KiGt5WOWJmYt8.png?w=200&h=200&f=face')",
            backgroundSize: "fill",
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }} className={inter.className}>
        <Theme>
            <Navbar/>
            {children}
        </Theme>
        </body>
        </html>
    );
}
