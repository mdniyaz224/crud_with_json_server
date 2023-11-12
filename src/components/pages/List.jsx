import React from 'react'
import {
    Typography, Box, TableContainer, Table, TableBody, TableCell
    , TableHead, TableRow, Paper, IconButton, Tooltip,
} from "@mui/material"


import { NavLink } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react'
import axios from "axios"
const List = () => {
    const [students, setStudents] = useState([]);
    useEffect(() => {
        getdata();
    }, [])
    async function getdata() {
        try {
            const studata = await axios.get("http://localhost:3000/students");
            // console.log(studata.data)
            setStudents(studata.data)
        } catch (error) {
            console.log("something is wrong")
        }

    }
    const handleDelete = async id => {
        await axios.delete(`http://localhost:3000/students/${id}`);
        let newstu = students.filter((items)=>{
            return items.id !== id;
        })
        setStudents(newstu);
    }

    return (
        <>
            <Box textAlign='center' mb={2} mt={2} style={{ backgroundColor: '#A44EE9', color: 'white' }}>
                <Typography variant='h4'>
                    Student List
                </Typography>
            </Box>
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow style={{ backgroundColor: "#616161" }}>
                            <TableCell align="center" style={{ color: "white", fontSize: "16", fontWeight: "bold" }}>No</TableCell>
                            <TableCell align="center" style={{ color: "white", fontSize: "16", fontWeight: "bold" }}>Name</TableCell>
                            <TableCell align="center" style={{ color: "white", fontSize: "16", fontWeight: "bold" }}>Email</TableCell>
                            <TableCell align="center" style={{ color: "white", fontSize: "16", fontWeight: "bold" }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            students.map((items, i) => {
                                return (
                                    <TableRow key={i}>
                                        <TableCell align="center">{items.id}</TableCell>
                                        <TableCell align="center">{items.stuname}</TableCell>
                                        <TableCell align="center">{items.email}</TableCell>
                                        <TableCell align="center">
                                            <Tooltip title="view">
                                                <IconButton><NavLink to={`/view/${items.id}`}><VisibilityIcon color='primary' /></NavLink></IconButton>
                                            </Tooltip>
                                            <Tooltip title="Edit">
                                                <IconButton><NavLink to={`/edit/${items.id}`}><EditIcon color="primary" /></NavLink></IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton onClick={() => handleDelete(items.id)}><DeleteIcon color="primary" /></IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }

                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default List