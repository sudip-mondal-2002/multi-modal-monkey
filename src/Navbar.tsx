import {AppBar, Typography} from "@mui/material";

export const Navbar = () => {
    return <AppBar position={"static"} sx={{
        padding: 2
    }}>
        <Typography variant={"h6"}>Multi Modal Monkey</Typography>
    </AppBar>

}