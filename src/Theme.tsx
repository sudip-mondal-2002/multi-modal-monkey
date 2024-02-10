'use client';

import {createTheme, ThemeProvider} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#1B2631",
        },
        secondary: {
            main: "#FFF",
        }
    }
});


export const Theme = ({children}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
}