import React from 'react';
import { Box } from '@mui/material';
import {Button} from '@mui/material';

export interface IPagination {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<IPagination> = ({ totalPages, currentPage, onPageChange }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <Button key={i} onClick={() => onPageChange(i)} color="primary" variant="contained" size="small" sx={ { minWidth: "30px", borderRadius: 28, marginRight: "6px" } } disabled={i === currentPage}>
        {i}
      </Button>
    );
  }

  return <Box my={2}>{pages}</Box>;
};