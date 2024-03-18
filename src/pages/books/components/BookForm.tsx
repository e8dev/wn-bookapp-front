// Example usage of useParams hook
import React from 'react';
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';

interface IBookFormProps {
  bookTitle: string;
  bookTitleErr: boolean;
  bookAuthor: string;
  bookAuthorErr: boolean;
  bookIsbn: string;
  bookIsbnErr: boolean;
  setBookTitle: React.Dispatch<React.SetStateAction<string>>;
  setBookAuthor: React.Dispatch<React.SetStateAction<string>>;
  setBookIsbn: React.Dispatch<React.SetStateAction<string>>;
  formHandler: () => Promise<void>;
  isProcessing: boolean;
}

export const BookForm: React.FC<IBookFormProps> = ({
  bookTitle,
  bookTitleErr,
  bookAuthor,
  bookAuthorErr,
  bookIsbn,
  bookIsbnErr,
  setBookTitle,
  setBookAuthor,
  setBookIsbn,
  formHandler,
  isProcessing
}) => {

  return (
    <>

      <TextField 
        fullWidth
        sx={{mb: 3}}
        label="Title" 
        variant="outlined" 
        error={bookTitleErr} 
        value={bookTitle}
        onChange={(e) => {
          setBookTitle(e.target.value)
        }}
      />
      <TextField 
        fullWidth
        sx={{mb: 3}}
        label="Author" 
        variant="outlined" 
        error={bookAuthorErr}
        value={bookAuthor} onChange={(e) => {
          setBookAuthor(e.target.value)
        }}
      />
      <TextField 
        fullWidth 
        sx={{mb: 3}} 
        label="ISBN" 
        variant="outlined" 
        error={bookIsbnErr} 
        value={bookIsbn} 
        onChange={(e) => {
          setBookIsbn(e.target.value)
        }}
      />
      
      <LoadingButton onClick={formHandler} loadingPosition="end" variant="contained" loading={isProcessing}> Save </LoadingButton>

    </>
  );
}



