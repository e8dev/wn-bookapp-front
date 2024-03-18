// Example usage of useParams hook
import React, {FC, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { xAlert } from '../../components/misc/Alert';
import { BookForm } from './components/BookForm';
import { addBookApi } from '../../api/books';

const AddBookPage:FC = () => {

  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);

  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookIsbn,setBookIsbn] = useState("");

  const [bookTitleErr, setBookTitleErr] = useState(false);
  const [bookAuthorErr, setBookAuthorErr] = useState(false);
  const [bookIsbnErr,setBookIsbnErr] = useState(false);

  const handleAddBook = async () => {

    //title
    if( !bookTitle ){
      setBookTitleErr(true);
      xAlert(
        {
          title: "Validation error",
          text: "Book's Title cannot be empty",
          icon: "error",
        }
      );
      return;
    }else{
      setBookTitleErr(false);
    }
    //author
    if( !bookAuthor ){
      setBookAuthorErr(true);
      xAlert(
        {
          title: "Validation error",
          text: "Book's Author cannot be empty",
          icon: "error",
        }
      );
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

    const result = await addBookApi(data);

    setIsProcessing(false);

      if(result.success == true && result.data && result.data.id){
        xAlert(
          {
            title: "Book was saved",
            text: "",
            icon: "success",
          },
          function(){
            navigate("/books/edit/"+result.data.id)
          }
        );
      }

  }

  return (
    <>
      <h2>Create new Book</h2>

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
        formHandler={handleAddBook}
        isProcessing={isProcessing}
      />

    </>
  );
}

export default AddBookPage;
