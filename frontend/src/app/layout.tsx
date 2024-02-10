import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {Theme} from "@/Theme";
import {Navbar} from "@/Navbar";
import Background from './background.png'
import Image from "next/image";
import {Container} from "@mui/material";

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
        }} className={inter.className}>
        <Container
            maxWidth={false}
            disableGutters={false}
            sx={{
                position: 'absolute',
                top: 100,
                zIndex: -1,
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
            }}>
            <Image src={Background} alt={"background"} width={900} height={600}/>
        </Container>
        <Theme>
            <Navbar/>
            {children}
        </Theme>
        </body>
        </html>
    );
}
