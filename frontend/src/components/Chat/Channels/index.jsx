import { Box, Button } from '@mui/material';
import { useState, useCallback, useContext } from 'react';
import { useDispatch } from 'react-redux';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useTranslation } from 'react-i18next';
import { SocketContext } from 'context/socketContext';
import { actions as actionsChannels } from 'store/channelSlice';
import ModalChannel from 'components/ModalChannel';
import Popup from 'components/Popup';
import styled from '../styled';

const ItemChannel = ({ item, activeChannelId, callbackChannel }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <li
      style={{
        ...styled.listItem,
        backgroundColor: activeChannelId === item.id ? '#5c636a' : '#FFFAFA',
      }}
    >
      <Button
        type="button"
        onClick={() => dispatch(actionsChannels.changeActiveChannelId(item.id))}
        style={{
          ...styled.button,
          color: activeChannelId === item.id ? '#fff' : '#000',
        }}
      >
        #
        {' '}
        {item.name}
      </Button>
      {item.removable && (
        <>
          <Button
            style={styled.buttonArrow}
            type="button"
            onClick={handleClick}
          >
            <span style={styled.management}>{t('channelManagement')}</span>
            ▼
          </Button>
          <Popup
            anchorEl={anchorEl}
            handleClosePopup={handleClose}
            item={item}
            callbackChannel={callbackChannel}
          />
        </>
      )}
    </li>
  );
};

const Channels = ({ channels, activeChannelId }) => {
  const socket = useContext(SocketContext);
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = useCallback(() => setOpenModal(true), []);
  const handleClose = useCallback(() => setOpenModal(false), []);

  const callbackChannel = useCallback(
    (props) => {
      const { channelName, id } = props;

      return new Promise((resolve, reject) => {
        if (channelName) {
          if (channelName.length < 3 || channelName.length > 20) {
            reject(new Error(t('errors.minMaxName')));
            return;
          }
          if (channels.find((item) => item.name === channelName)) {
            reject(new Error(t('errors.uniqueChannel')));
            return;
          }
        }
        try {
          if (!id && channelName) {
            socket.emit(
              'newChannel',
              {
                name: channelName,
              },
              (res) => {
                if (res.status === 'ok') {
                  resolve();
                }
              },
            );
          } else if (id && channelName) {
            socket.emit(
              'renameChannel',
              {
                name: channelName,
                id,
              },
              (res) => {
                if (res.status === 'ok') {
                  resolve();
                }
              },
            );
          } else {
            socket.emit(
              'removeChannel',
              {
                id,
              },
              (res) => {
                if (res.status === 'ok') {
                  resolve();
                }
              },
            );
          }
        } catch (err) {
          reject(err);
        }
      });
    },
    [channels, socket, t],
  );

  return (
    <Box style={styled.channels}>
      <Box style={styled.title}>
        <Box>{t('channels')}</Box>
        <Button
          style={{ maxWidth: 26, maxHeight: 26, minWidth: 26 }}
          variant="outlined"
        >
          <AddCircleOutlineIcon
            color="primary"
            style={{ cursor: 'pointer' }}
            onClick={handleOpen}
          />
          <span style={styled.plus}>+</span>
        </Button>
      </Box>
      <ModalChannel
        open={openModal}
        handleClose={handleClose}
        callback={callbackChannel}
        type="create"
      />
      {channels.length > 0 && (
        <ul style={styled.list}>
          {channels.map((item) => (
            <ItemChannel
              item={item}
              key={item.id}
              activeChannelId={activeChannelId}
              callbackChannel={callbackChannel}
            />
          ))}
        </ul>
      )}
    </Box>
  );
};

export default Channels;
