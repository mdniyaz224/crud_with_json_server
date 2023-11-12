import React from 'react'
import axios from "axios"
import {
    Typography, Box, TableContainer, Table, TableBody, TableCell
    , TableHead, TableRow, Paper, IconButton, Tooltip,
} from "@mui/material"
import { Link } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'

const View = () => {
    const { id } = useParams();
 
    const [student, setStudent] = useState([]);
    useEffect(() => {
        getdata();
    }, [id])
    async function getdata() {
        try {
            const studata = await axios.get(`http://localhost:3000/students/${id}`);
            // console.log(studata.data)
            setStudent(studata.data)
        } catch (error) {
            console.log("something is wrong")
        }

    }
    console.log(id);
    return (
        <>
            <Box textAlign='center' mb={2} mt={2} style={{ backgroundColor: '#A44EE9', color: 'white' }}>
                <Typography variant='h4'>
                    Student List
                </Typography>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow style={{ backgroundColor: "#616161" }}>
                            <TableCell align="center" style={{ color: "white", fontSize: "16", fontWeight: "bold" }}>No</TableCell>
                            <TableCell align="center" style={{ color: "white", fontSize: "16", fontWeight: "bold" }}>Name</TableCell>
                            <TableCell align="center" style={{ color: "white", fontSize: "16", fontWeight: "bold" }}>Email</TableCell>
                            <TableCell align="center" style={{ color: "white", fontSize: "16", fontWeight: "bold" }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableCell align="center">{student.id}</TableCell>
                        <TableCell align="center">{student.stuname}</TableCell>
                        <TableCell align="center">{student.email}</TableCell>
                        <TableCell align="center">

                            <Tooltip title="Edit">
                                <IconButton><Link to={`/edit/${id}`}><EditIcon color="primary" /></Link></IconButton>
                            </Tooltip>

                        </TableCell>
                    </TableBody>
                </Table>
            </TableContainer>
            <Link to="/" style={{ textAlign: "center" }} className='goto_home'>Go to home</Link>
        </>
    )
}

export default View