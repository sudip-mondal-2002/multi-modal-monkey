'use client';

import {Button, Container, Paper, Skeleton, TextField, Typography} from "@mui/material";
import {useRef, useState} from "react";
import Image from "next/image";

export default function Home() {
    const reportInput = useRef<HTMLInputElement>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [symptoms, setSymptoms] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<string>("");
    return (
        <Container sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 2,
            flexDirection: "column"
        }}>
            <input
                ref={reportInput}
                type="file"
                multiple={false}
                accept="image/*"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        const url = URL.createObjectURL(file);
                        setImageUrl(url);
                        setResult("");
                    }
                }}
                style={{
                    display: "none"
                }}/>
            <Button variant={"contained"} onClick={() => {
                reportInput.current?.click();
            }}>Upload Cardiac Report</Button>
            <br/>
            {(imageUrl || loading || result) &&
                <Paper
                    elevation={3}
                    variant={'elevation'}
                    sx={{
                        padding: 2,
                        backgroundColor: "#1B2A38",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 2
                    }}>
                    {
                        imageUrl && <><Image src={imageUrl} alt={"Cardiac image"} width={400} height={400}/>
                            <TextField
                                sx={{
                                    marginTop: 2,
                                    marginBottom: 2,
                                    "& .MuiInputBase-input": {
                                        color: "white"
                                    }
                                }}
                                label={"Symptoms"}
                                multiline={true}
                                fullWidth={true}
                                value={symptoms}
                                color={"info"}
                                autoFocus={true}
                                onChange={(e) => {
                                    setSymptoms(e.target.value);
                                }}
                            />
                            <Button disabled={!imageUrl || !symptoms} variant={"contained"} onClick={() => {
                                const data = {
                                    imageUrl,
                                    symptoms
                                };
                                setLoading(true);
                                if (reportInput.current) reportInput.current.value = '';
                                setImageUrl(null);
                                setSymptoms("");
                                setTimeout(() => {
                                    setLoading(false);
                                    setResult("Cardiac Report is normal. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, neque nec aliquam placerat, velit turpis commodo purus, ut tristique ligula nunc a nisi. Proin vehicula rutrum odio, nec suscipit leo gravida in. Nulla facilisi. Integer id elit quis metus consequat efficitur. Mauris lacinia dui a enim mollis, ut tincidunt eros condimentum. Vivamus sollicitudin libero ut turpis tincidunt, eget ultricies metus viverra.\n" +
                                        "\n" +
                                        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus dictum justo id metus vehicula, a lobortis sapien tempus. Donec pulvinar lacus in lacus vehicula, vitae consequat lectus laoreet. Nullam viverra ipsum nec ante ultricies, ac dapibus enim vestibulum. Fusce et sapien nec arcu dapibus tempor. Sed at tellus velit. Vivamus tempus sapien in magna ultrices, vitae fermentum est ullamcorper. Integer eget vehicula velit. Curabitur eu quam vel justo lacinia eleifend. In id lorem at elit accumsan vehicula. Nulla facilisi. Maecenas sagittis nunc non nunc ultrices, ac hendrerit nulla convallis. Vivamus at mauris lacinia, tempor velit id, luctus dolor. Sed varius felis eu purus congue, in placerat eros vehicula. Cras vel sagittis tortor.");
                                }, 2000);

                            }}>Analyze</Button>
                        </>
                    }
                    {
                        loading && <Skeleton variant={"rectangular"} width={400} height={400}/>
                    }
                    {
                        result && <Typography color={"#FFF"} variant={"h6"}>{result}</Typography>
                    }
                </Paper>
            }
        </Container>
    );
}
