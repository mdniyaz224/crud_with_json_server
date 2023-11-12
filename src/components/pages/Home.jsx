import React from 'react'
import { Typography, Box, Grid, TextField, Button } from "@mui/material"
import List from './List'
import axios from "axios"
import { useState, } from 'react'
const Home = () => {
    const [Students, setStudents] = useState({
        stuname: " ",
        email: " "
    });
    const [status, setStatus] = useState(false);
    const onTextFieldChange = (e) => {
        setStudents({ ...Students, [e.target.name]: e.target.value });
        console.log(Students)
    }

    const add = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:3000/students`, Students);
            setStatus(true);
        } catch (error) {
            console.log("something is wrong")
        }

    }
    if (status === true) {
        return <Home />
    }
    return (

        <>
            <Box textAlign="center" style={{ backgroundColor: '#A45EE9', color: 'white' }} p={2}>
                <Typography variant='h3'>React CRUD with API call</Typography>
            </Box>
            <Grid container Justify="center" spacing={2}>
                <Grid item md={6} xs={12}>
                    <Box textAlign='center' mb={2} mt={2} style={{ backgroundColor: '#A44EE9', color: 'white' }}>
                        <Typography variant='h4'>
                            Add Student
                        </Typography>
                    </Box>
                    <form onSubmit={e => add(e)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField autoComplete='name' name='stuname'
                                    variant="outlined" fullWidth id='name' label="Name" onChange={e => onTextFieldChange(e)} autoFocus />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField autoComplete='email' name='email'
                                    variant="outlined" required fullWidth id='email' label="Email" onChange={e => onTextFieldChange(e)} autoFocus />
                            </Grid>
                            <Grid item xs={12}>
                                <Box >
                                    <Button type='submit' variant="contained" fullWidth color="primary" >Add</Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
                <Grid item md={6} xs={12}>
                    <List />

                </Grid>
            </Grid>
        </>
    )
}

export default Home