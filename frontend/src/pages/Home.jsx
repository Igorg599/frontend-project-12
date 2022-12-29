import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, CircularProgress } from '@mui/material';
import axios from 'axios';
import useLocalStorage from 'hooks/useLokalStorage';
import { actions as actionsChannels } from 'store/channelSlice';
import { actions as actionsMessages } from 'store/messageSlice';
import { actions as actionsUser } from 'store/userSlice';
import routes from 'utils/routes';
import Chat from 'components/Chat';

const Home = () => {
  const dispatch = useDispatch();
  const [token] = useLocalStorage('token');
  const [userName] = useLocalStorage('userName');
  const [loading, setLoading] = useState(true);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (userName) {
      dispatch(actionsUser.initUser(userName));
    }

    axios
      .get(routes.getData(), {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        dispatch(actionsChannels.initChannels(response.data.channels));
        dispatch(actionsMessages.initMessages(response.data.messages));
        setLoading(false);
      })
      .catch((err) => {
        throw err;
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
