import React, {useState, useEffect} from 'react';
import { useSearchParams } from 'react-router-dom';
import { Grid, Box } from '@mui/material';
import PageContainer from '../../components/container/PageContainer';

// components
import {BooksListTable} from './components/BooksListTable';

import { Book } from '../../types/Book';
import { Pagination, IPagination } from '../../components/Pagination';
import { getBooksApi } from '../../api/books';

const defaultPage = "1";

const Dashboard = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState<Book[]>([]);

  //pagination
  const [pagination, setPagination] = useState<IPagination>();

  let currentPage: string | null = searchParams.get("page");
  currentPage = currentPage ? currentPage : defaultPage;

  useEffect(() => {
      getBooks(currentPage);
  }, [currentPage]);

  async function getBooks(page: string | null) {

      const result = await getBooksApi(page);

      console.log(result);

      if(result.success == true && result.data.books){
        if(result.data.books.length > 0){
          setBooks(result.data.books);
          setPagination({
              totalPages: result.data.pagination.totalPages,
              currentPage: result.data.pagination.currentPage,
              onPageChange: onPageChange
          });
        }else{
          setBooks([]);
          setSearchParams({ page: "1" });
          setPagination({
              totalPages: 1,
              currentPage: 1,
              onPageChange: onPageChange
          });
        }
          
      }
  }

function onPageChange(page: number) {
    setSearchParams({ page: page.toString() });
}

  return (
    <PageContainer title="Books List" description="Main page">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <BooksListTable books={books} currentPage={currentPage} getBooks={getBooks} />
            {pagination && (
                <Pagination
                    totalPages={pagination.totalPages}
                    currentPage={parseInt(currentPage)}
                    onPageChange={onPageChange}
                />
            )}
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
