import React from 'react'
import { Link } from 'react-router-dom'
import '../../App.css';
import {
    Typography, Box, Grid,
    TextField, Button,
} from "@mui/material"
import axios from "axios"
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'

const Edit = () => {
    const { id } = useParams();
    const [Students, setStudents] = useState({
        stuname: " ",
        email: " "
    });
    useEffect(() => {
        getdata();
    }, [])
    async function getdata() {
        try {
            const studata = await axios.get(`http://localhost:3000/students/${id}`);
            // console.log(studata.data)
            setStudents(studata.data)

        } catch (error) {
            console.log("something is wrong")
        }

    }
    const onTextFieldChange = (e) => {
        setStudents({ ...Students, [e.target.name]: e.target.value });

    }
    const update = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/students/${id}`, Students);
            alert("update is successfull")
            setStudents({
                stuname: " ",
                email: " "
            })

        } catch (error) {
            console.log("something is wrong")
        }

    }
    return (
        <>
            <Grid item md={6} xs={12}>
                <Box textAlign='center' mb={2} mt={2} style={{ backgroundColor: '#A44EE9', color: 'white' }}>
                    <Typography variant='h4'>
                        Edit List
                    </Typography>
                </Box>
                <form onSubmit={e => update(e)}>
                    <Grid container spacing={2} textAlign="center" sx={{ width: '50%', margin: 'auto', padding: 'auto' }}>
                        <Grid item xs={12} spacing={2} className='edit_center'>
                            <Grid item xs={6} mb={2}>
                                <TextField autoComplete='id' name='id'
                                    variant="outlined" required fullWidth id='id' label="id" value={Students.id} autoFocus />
                            </Grid>
                            <Grid item xs={6} mb={2}>
                                <TextField autoComplete='name' name='stuname'
                                    variant="outlined" required fullWidth id='name' label="Name" value={Students.stuname} onChange={e => onTextFieldChange(e)} autoFocus />
                            </Grid>
                            <Grid item xs={6} mb={2}>
                                <TextField autoComplete='email' name='email'
                                    variant="outlined" required fullWidth id='email' label="Email" value={Students.email} onChange={e => onTextFieldChange(e)} autoFocus />
                            </Grid>
                            <Grid item xs={6}>
                                <Box >
                                    <Button type="submit" variant="contained" fullWidth color="primary" >Update</Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Link to="/" style={{ textAlign: "center" }} className='goto_home'>Go to home</Link>
                </form>
            </Grid>
        </>
    )
}

export default Edit