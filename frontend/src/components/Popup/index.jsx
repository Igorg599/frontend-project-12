import Popover from '@mui/material/Popover';
import { Button, Box } from '@mui/material';
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import ModalChannel from 'components/ModalChannel';
import styled from './styled';

const Popup = ({
  anchorEl, handleClosePopup, item, callbackChannel,
}) => {
  const { t } = useTranslation();
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const handleOpenUpdate = useCallback(() => setOpenModalUpdate(true), []);
  const handleCloseUpdate = useCallback(() => setOpenModalUpdate(false), []);

  const handleOpenDelete = useCallback(() => setOpenModalDelete(true), []);
  const handleCloseDelete = useCallback(() => setOpenModalDelete(false), []);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopup}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box style={styled.containerPopup}>
          <Button
            style={styled.button}
            type="button"
            onClick={() => {
              handleOpenDelete();
              handleClosePopup();
            }}
          >
            {t('delete')}
          </Button>
          <Button
            style={styled.button}
            type="button"
            onClick={() => {
              handleOpenUpdate();
              handleClosePopup();
            }}
          >
            {t('rename')}
          </Button>
        </Box>
      </Popover>
      <ModalChannel
        open={openModalUpdate}
        handleClose={handleCloseUpdate}
        callback={callbackChannel}
        type="update"
        itemChannel={item}
      />
      <ModalChannel
        open={openModalDelete}
        handleClose={handleCloseDelete}
        callback={callbackChannel}
        type="delete"
        itemChannel={item}
      />
    </>
  );
};

export default Popup;
