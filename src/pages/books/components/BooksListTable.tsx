import React, {useState} from 'react';
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import {Button, } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { Book } from '../../../types/Book';
import { xAlert } from '../../../components/misc/Alert';
import { deleteBookApi } from '../../../api/books';

interface BookListProps {
    books: Book[];
    currentPage: string;
    getBooks: (page: string) => Promise<void>;
}

export const BooksListTable: React.FC<BookListProps> = ({ books, currentPage, getBooks }) => {

    //TODO: add processing button
    const [isProcessing, setIsProcessing] = useState(false);

    //before deleteing any data we show alert to user
    const handleDeleteBook = async (id: string, title: string) => {
        
        xAlert({
            title: "Warning",
            text: "Are you sure you want ot delete book: " + title,
            icon: "warning",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel"
            },
            function(){
                //confirm action
                handleDeleteBookProcess(id);
            },
            function(){
                //cancel action
            }
        );
        return;
            
    }

    const handleDeleteBookProcess = async (id: string) => {

        if(!id){
            xAlert({
                title: "Validation error",
                text: "Book ID is empty",
                icon: "error",
            });
            return;
        }
        
        setIsProcessing(true);

        try {

            const result = await deleteBookApi(id);
            if(result.success!==undefined && result.success == true){
                xAlert({
                    title: "Book was successfully removed",
                    text: "",
                    icon: "success",
                    },function(){
                    
                    getBooks(currentPage)
                    
                    });
                }

        }catch(error){

            xAlert({
                title: "Error",
                text: "Something goes wrong. Try again later",
                icon: "error",
                });

        }

        setIsProcessing(false);

    }

    return (

        
            
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: "nowrap",
                        mt: 2
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Title
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Author
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    ISBN
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Edit
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Delete
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                            {item.author}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                    {item.isbn}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Button color="primary" 
                                        to={"/books/edit/"+item.id}
                                        variant="contained"
                                        size="small" 
                                        component={RouterLink}
                                        >Edit</Button>
                                </TableCell>
                                <TableCell align="right">
                                    <Button color="primary" onClick={() => {
                                        handleDeleteBook(item.id, item.title)
                                    }} variant="contained" size="small">
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        
    );
};
