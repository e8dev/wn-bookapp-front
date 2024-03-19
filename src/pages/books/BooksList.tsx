import React, {useState, useEffect} from 'react';
import { useSearchParams } from 'react-router-dom';
import { Grid, TextField, Select, MenuItem, FormGroup, Box, Button } from '@mui/material';
import PageContainer from '../../components/container/PageContainer';

// components
import {BooksListTable} from './components/BooksListTable';

import DashboardCard from '../../components/shared/DashboardCard';
import { Book } from '../../types/Book';
import { Pagination, IPagination } from '../../components/Pagination';
import { getBooksApi, searchBookApi } from '../../api/books';

const defaultPage = "1";
//list of search items
const searchItems = [
  {"name":"Title","handler":"title"},
  {"name":"Author","handler":"author"},
  {"name":"ISBN","handler":"isbn"},
];


const Dashboard = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState<Book[]>([]);

  //filter
  const [searchText, setSearchText] = useState("");
  const [searchItem, setSearchItem] = useState(searchItems[0].handler);


  //pagination
  const [pagination, setPagination] = useState<IPagination>();

  let currentPage: string = searchParams.get("page") || defaultPage;

  useEffect(() => {
      getBooks(currentPage);
  }, [currentPage]);

  async function handleSearch(){

    setSearchParams({ page: defaultPage });
    getBooks(defaultPage);

  }

  async function getBooks(page: string) {

      const result = await searchBookApi(searchText, searchItem, page);
      //const result = await getBooksApi(page);

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
          setSearchParams({ page: defaultPage });
          setPagination({
              totalPages: 1,
              currentPage: parseInt(defaultPage),
              onPageChange: onPageChange
          });
        }
          
      }
  }

  function onPageChange(page: number) {
      setSearchParams({ page: page.toString() });
  }

  const handleClearFilters = () => {
    setSearchText("");
    setSearchParams({ page: defaultPage });
  }

  useEffect(() => {
    getBooks(currentPage);
}, [searchText, searchItem]);

  return (
    <PageContainer title="Books List" description="Main page">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <DashboardCard title="Books List">
              <Box>
                <FormGroup sx={{position: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems:'center'}} >
                  <TextField
                      sx={{marginRight:"6px"}}
                      label="Search" 
                      variant="outlined" 
                      value={searchText}
                      onChange={(e) => {
                          setSearchText(e.target.value)
                      }}
                  />
                  <Select
                      sx={{marginRight:"6px"}}
                      value={searchItem}
                      onChange={(e) => {
                          setSearchItem(e.target.value)
                      }}
                  >
                  {searchItems.map((item, index) => {
                      return <MenuItem value={item.handler}>{item.name}</MenuItem>;
                  })}
                  </Select>
                  <Button onClick={() => {
                      handleSearch()
                  }}>SEARCH</Button>
                  <Button onClick={() => {
                      handleClearFilters()
                  }}>CLEAR FILTERS</Button>
                </FormGroup>
              </Box>
              <BooksListTable books={books} currentPage={currentPage} getBooks={getBooks} />
              {pagination && (
                <Pagination
                    totalPages={pagination.totalPages}
                    currentPage={parseInt(currentPage)}
                    onPageChange={onPageChange}
                />
              )}
            </DashboardCard>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
