import { useEffect, useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { Box, CircularProgress } from '@mui/material';
import axios from 'axios';
import useAuth from 'hooks/useAuth';
import { actions as actionsChannels } from 'store/channelSlice';
import { actions as actionsMessages } from 'store/messageSlice';
import AuthContext from 'context/authContext';
import routes from 'utils/routes';
import Chat from 'components/Chat';

const Home = () => {
  const dispatch = useDispatch();
  const { token, setCurrentUser } = useContext(AuthContext);
  const auth = useAuth();
  const [loading, setLoading] = useState(true);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    axios
      .get(routes.getData(), {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        dispatch(actionsChannels.initChannels(response.data.channels));
        dispatch(actionsMessages.initMessages(response.data.messages));
        setLoading(false);
      })
      .catch(() => {
        auth.logOut();
        setCurrentUser(null);
      });
  }, []);

  return (
    <Box>
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 'calc(50vh - 50px)',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box className="container">
          <Chat />
        </Box>
      )}
    </Box>
  );
};

export default Home;
