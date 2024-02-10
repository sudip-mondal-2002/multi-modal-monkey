import {AppBar, Typography} from "@mui/material";

export const Navbar = () => {
    return <AppBar
        position={"static"}
        sx={{
        padding: 2,
        backgroundColor: "#0E1823",
    }}
        elevation={0}
    >
        <Typography variant={"h6"}>Multi Modal Monkey</Typography>
    </AppBar>

}