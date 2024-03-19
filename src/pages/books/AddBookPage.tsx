import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { xAlert } from '../../components/misc/Alert';
import { BookForm } from './components/BookForm';
import { addBookApi } from '../../api/books';

const AddBookPage: FC = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookIsbn, setBookIsbn] = useState("");
  const [bookTitleErr, setBookTitleErr] = useState(false);
  const [bookAuthorErr, setBookAuthorErr] = useState(false);
  const [bookIsbnErr, setBookIsbnErr] = useState(false);

  const handleAddBook = async () => {
    const validateInputs = () => {
      if (!bookTitle) {
        setBookTitleErr(true);
        xAlert({
          title: "Validation error",
          text: "Book's Title cannot be empty",
          icon: "error",
        });
        return false;
      }
      if (!bookAuthor) {
        setBookAuthorErr(true);
        xAlert({
          title: "Validation error",
          text: "Book's Author cannot be empty",
          icon: "error",
        });
        return false;
      }
      return true;
    };

    if (!validateInputs()) return;

    setIsProcessing(true);

    const data: any = { title: bookTitle, author: bookAuthor, isbn: bookIsbn };
    const result = await addBookApi(data);

    setIsProcessing(false);

    if (result.success && result.data && result.data.id) {
      xAlert({
        title: "Book was saved",
        text: "",
        icon: "success",
      }, () => {
        navigate(`/books/edit/${result.data.id}`);
      });
    }
  };

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
};

export default AddBookPage;
