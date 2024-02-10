import {AppBar, Box, Button, Typography} from "@mui/material";
import Image from "next/image";
import Logo from './icon.webp'
import Link from "next/link";

export const Navbar = () => {
    return <AppBar
        position={"static"}
        sx={{
            padding: 2,
            backgroundColor: "#0E1823",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            gap: 1
        }}
        elevation={0}
    >
        <Box sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 1
        }}>
            <Image src={Logo} alt={'llama'} width={25} height={25}/>
            <Typography variant={"h6"}>Multi Modal Monkey</Typography>
        </Box>
        <Box>
            <Link href={"https://github.com/sudip-mondal-2002/multi-modal-monkey"} passHref={true}>
                <Button variant={"contained"} sx={{
                    borderRadius: 2,
                    height: 40,
                    marginRight: 2,
                    fontWeight: "bold",
                }}>GitHub</Button>
            </Link>
        </Box>
    </AppBar>

}