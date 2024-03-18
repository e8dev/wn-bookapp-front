import { Link } from 'react-router-dom';
import { ReactComponent as LogoDark } from '../../../../assets/images/logos/books_logo.svg';
import { styled } from '@mui/material';

const LinkStyled = styled(Link)(() => ({
  height: '70px',
  width: '180px',
  overflow: 'hidden',
  display: 'block',
}));

const Logo = () => {
  return (
    <LinkStyled to="/">
      <LogoDark style={{marginTop:"10px",width:"60px",height:"60px"}} />
      
    </LinkStyled>
  )
};

export default Logo;
