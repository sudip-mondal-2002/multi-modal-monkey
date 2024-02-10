'use client';

import 'regenerator-runtime/runtime'
import {Box, Button, Container, IconButton, Paper, Skeleton, TextField, Typography} from "@mui/material";
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition'
import {useEffect, useRef, useState} from "react";
import Image from "next/image";
import MicOffIcon from '@mui/icons-material/MicOff';
import MicIcon from '@mui/icons-material/Mic';

export default function Home() {
    const reportInput = useRef<HTMLInputElement>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [symptoms, setSymptoms] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<string>("");

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    useEffect(() => {
        setSymptoms(transcript);
    }, [transcript])

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
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            const url = e.target?.result as string;
                            setImageUrl(url);
                        };
                        reader.readAsDataURL(file);
                        setResult("");
                    }
                }}
                style={{
                    display: "none"
                }}/>
            <Button
                sx={{
                    background: "linear-gradient(90deg,#D927C3  30%, #AB9AEC 90%)",
                    borderRadius: 2,
                    height: 48,
                    fontWeight: "bold",
                }}
                disabled={loading}
                variant={"contained"}
                onClick={() => {
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
                            <Box sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%"
                            }}>
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
                                {
                                    browserSupportsSpeechRecognition && <>
                                        {listening ? <IconButton onClick={() => {
                                            resetTranscript();
                                            SpeechRecognition.stopListening();
                                        }}>
                                            <MicOffIcon color={"secondary"}/>
                                        </IconButton> : <IconButton onClick={() => {
                                            SpeechRecognition.startListening();
                                        }}>
                                            <MicIcon color={"secondary"}/>
                                        </IconButton>}
                                    </>
                                }
                            </Box>
                            <Button disabled={!imageUrl || !symptoms} variant={"contained"} onClick={async () => {
                                const data = {
                                    img_url: imageUrl,
                                    message: symptoms
                                };
                                setLoading(true);
                                if (reportInput.current) reportInput.current.value = '';
                                setImageUrl(null);
                                setSymptoms("");
                                console.log(data)
                                const res = await fetch("https://multi-modal-monkey.onrender.com/image", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify(data)
                                }).then(res => res.json());
                                setLoading(false);
                                setResult(res.response);
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
