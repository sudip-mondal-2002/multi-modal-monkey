import {AppBar, Typography} from "@mui/material";
import Image from "next/image";
import Logo from './icon.webp'

export const Navbar = () => {
    return <AppBar
        position={"static"}
        sx={{
            padding: 2,
            backgroundColor: "#0E1823",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "row",
            gap: 1
        }}
        elevation={0}
    >
        <Image src={Logo} alt={'llama'} width={25} height={25}/>
        <Typography variant={"h6"}>Multi Modal Monkey</Typography>
    </AppBar>

}