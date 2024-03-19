// Example usage of useParams hook
import React, {FC, useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { xAlert } from '../../components/misc/Alert';
import { BookForm } from './components/BookForm';
import { editBookApi, getBookByIDApi } from '../../api/books';
import { Typography } from '@mui/material';
import PageContainer from '../../components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';

const EditBookPage:FC = () => {

  let { id } = useParams<{ id: string }>();

  const [isProcessing, setIsProcessing] = useState(false);

  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookIsbn,setBookIsbn] = useState("");

  const [bookTitleErr, setBookTitleErr] = useState(false);
  const [bookAuthorErr, setBookAuthorErr] = useState(false);
  const [bookIsbnErr,setBookIsbnErr] = useState(false);

  //receive from api details

  useEffect(() => {
    //load book details
    handleGetBookByID();
  },[])

  const handleGetBookByID = async () => {

    if(id){
      const result = await getBookByIDApi(id);
      if(result.success == true && result.data){
        setBookAuthor(result.data.author);
        setBookTitle(result.data.title);
        setBookIsbn(result.data.isbn);
      }
    }else{
      //error getting book details
    }

  }

  const handleEditBook = async () => {

    if(!id){
      xAlert({
          title: "Validation error",
          text: "Book ID is empty",
          icon: "error",
        });
      return;
    }
    //title
    if( !bookTitle ){
      setBookTitleErr(true);
      xAlert({
          title: "Validation error",
          text: "Book's Title cannot be empty",
          icon: "error",
        });
      return;
    }else{
      setBookTitleErr(false);
    }
    //author
    if( !bookAuthor ){
      setBookAuthorErr(true);
      xAlert({
          title: "Validation error",
          text: "Book's Author cannot be empty",
          icon: "error",
        });
      return;
    }else{
      setBookAuthorErr(false);
    }
    //TODO: ISBN we don't check, it's not required field, but we can add format checking

    setIsProcessing(true);

    const data: any = {
      title: bookTitle,
      author: bookAuthor,
      isbn: bookIsbn
    }

    const result = await editBookApi(id, data);

    setIsProcessing(false);

      if(result.success == true && result.data.id){
        xAlert({
            title: "Book was updated",
            text: "",
            icon: "success",
          });
      }

  }

  return (
    <PageContainer title="Edit Book" description="desc">

      <DashboardCard title="Edit Book">
        <BookForm
        bookTitle={bookTitle}
        bookTitleErr={bookTitleErr}
        bookAuthor={bookAuthor}
        bookAuthorErr={bookAuthorErr}
        bookIsbn={bookIsbn}
        bookIsbnErr={bookIsbnErr}
        setBookTitle={setBookTitle}
        setBookAuthor={setBookAuthor}
        setBookIsbn={setBookIsbn}
        formHandler={handleEditBook}
        isProcessing={isProcessing}
      />
      </DashboardCard>
    </PageContainer>
  );
}

export default EditBookPage;
