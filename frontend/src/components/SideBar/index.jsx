import { Button } from '@material-ui/core';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import AuthContext from 'context/authContext';
import useAuth from 'hooks/useAuth';
import styled from './styled';

const SideBar = () => {
  const { setCurrentUser } = useContext(AuthContext);
  const auth = useAuth();
  const { t } = useTranslation();

  const goOutApp = () => {
    auth.logOut();
    setCurrentUser(null);
  };

  return (
    <nav
      style={{
        ...styled.nav,
        justifyContent: auth.loggedIn ? 'space-between' : 'start',
      }}
    >
      <a href="/" style={styled.link}>
        {t('title')}
      </a>
      {auth.loggedIn && (
        <Button variant="contained" color="primary" onClick={goOutApp}>
          {t('signOut')}
        </Button>
      )}
    </nav>
  );
};

export default SideBar;
