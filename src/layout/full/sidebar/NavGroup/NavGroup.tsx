import PropTypes from 'prop-types';
import { FC } from 'react';
// mui imports
import { ListSubheader, styled } from '@mui/material';

interface IProps {
  item: any;
}

const NavGroup: FC<IProps> = ({ item }) => {
  const ListSubheaderStyle = styled((props) => <ListSubheader disableSticky {...props} />)(
    ({ theme }) => ({
      ...theme.typography.overline,
      fontWeight: '700',
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(0),
      color: theme.palette.text.primary,
      lineHeight: '26px',
      padding: '3px 12px',
    }),
  );
  return (
    <>
      {/*@ts-ignore*/}
      <ListSubheaderStyle>{item.subheader}</ListSubheaderStyle>
    </>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object,
};

export default NavGroup;
