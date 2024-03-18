// Example usage of Link component
import React, {FC} from 'react';
import { Link } from 'react-router-dom';

const Page404:FC = () => {

    //

  return (
    <div>
      <h1>404</h1>
      <Link to="/add">Page not found</Link>
    </div>
  );
}

export default Page404;