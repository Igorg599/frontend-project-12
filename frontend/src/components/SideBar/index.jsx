import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { actions as actionsUser } from 'store/userSlice';
import useAuth from 'hooks/useAuth';
import styled from './styled';

const SideBar = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const { t } = useTranslation();

  const goOutApp = () => {
    auth.logOut();
    dispatch(actionsUser.signOff());
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
