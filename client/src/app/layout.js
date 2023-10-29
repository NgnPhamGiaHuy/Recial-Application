import './globals.css';
import {Rubik} from "next/font/google";

import Favicon from '/public/images/Metadata/favicon.ico';
import {Providers} from "@/components";

const rubik = Rubik({subsets: ["latin"]});

export const metadata = {
    title: 'Recial',
    description: 'Generated by create next app',
    icons: [{ rel: 'icon', url: Favicon.src }],
}

export default function RootLayout({children}) {
    return (
        <html lang="en">
            <body className={`${rubik.className}`}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
}
