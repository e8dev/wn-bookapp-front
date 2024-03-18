import React, { lazy } from 'react';
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom';
//import BooksList from '../pages/books/BooksList';
import AddBookPage from '../pages/books/AddBookPage';
import EditBookPage from '../pages/books/EditBookPage';
import Page404 from '../pages/404';

//custom
import { baselightTheme } from "../layout/theme/DefaultColors";
import Loadable from '../layout/full/shared/loadable/Loadable';
/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layout/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layout/blank/BlankLayout')));



/* ****Pages***** */
const BooksList = Loadable(lazy(() => import('../pages/books/BooksList')))
const SamplePage = Loadable(lazy(() => import('../pages/sample-page/SamplePage')))



const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route element={<FullLayout />}>
          <Route path="/" element={<BooksList />} />
          <Route path="/sample-page" element={<SamplePage />} />
          <Route path="/books/list" element={<BooksList />} />
          <Route path="/books/add" element={<AddBookPage />} />
          <Route path="/books/edit/:id" element={<EditBookPage />} />
        
          <Route path="/404" element={<Page404 />} />
          {/* Redirect to 404 if not found */}
          <Route path="*" element={<Navigate to="/404" replace />} />
        
          </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
