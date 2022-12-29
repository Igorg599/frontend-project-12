import {
  Box, Typography, Modal, TextField, Button,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import CloseIcon from '@mui/icons-material/Close';
import styled from './styled';

const ContentModal = ({
  handleClose, type, callback, itemChannel,
}) => {
  const { t } = useTranslation();
  const [disabledButton, setDisabledButton] = useState(false);

  const notify = (message) => toast.success(message);

  const handleDeleteChannel = () => {
    setDisabledButton(true);
    callback({ id: itemChannel.id })
      .then(() => {
        notify(t('toast.deleteChannel'));
        handleClose();
      })
      .catch((err) => {
        setDisabledButton(false);
        console.log(err);
      });
  };

  switch (type) {
    case 'update':
    case 'create': {
      return (
        <>
          <Box style={styled.header}>
            <Typography style={styled.title}>
              {type === 'create' ? t('modal.create') : t('modal.rename')}
            </Typography>
            <CloseIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Box>
          <Formik
            initialValues={{ name: type === 'create' ? '' : itemChannel.name }}
            onSubmit={(values, action) => {
              setDisabledButton(true);
              callback(
                type === 'create'
                  ? { channelName: values.name }
                  : { channelName: values.name, id: itemChannel.id },
              )
                .then(() => {
                  notify(
                    type === 'create'
                      ? t('toast.createChannel')
                      : t('toast.renameChannel'),
                  );
                  handleClose();
                })
                .catch((err) => {
                  setDisabledButton(false);
                  action.setErrors({ name: err.message });
                });
            }}
          >
            {({
              values, handleChange, handleBlur, handleSubmit, errors,
            }) => (
              <form style={{ width: '100%' }} onSubmit={handleSubmit}>
                <TextField
                  id="name"
                  style={styled.input}
                  size="small"
                  value={values.name}
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  error={!!errors.name}
                  autoFocus
                />
                <label style={styled.label} htmlFor="name">
                  {t('modal.name')}
                </label>
                {errors.name && <Box style={styled.error}>{errors.name}</Box>}
                <Box style={styled.buttons}>
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={handleClose}
                    type="button"
                  >
                    {t('cancel')}
                  </Button>
                  <Button
                    variant="contained"
                    style={{ marginLeft: 10 }}
                    type="submit"
                    disabled={disabledButton}
                  >
                    {t('send')}
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </>
      );
    }

    case 'delete': {
      return (
        <>
          <Box style={styled.header}>
            <Typography style={styled.title}>
              {t('modal.deleteChannel')}
            </Typography>
            <CloseIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Box>
          <Typography style={styled.delete}>{t('modal.sure')}</Typography>
          <Box style={styled.buttons}>
            <Button variant="contained" color="inherit" onClick={handleClose}>
              {t('cancel')}
            </Button>
            <Button
              variant="contained"
              color="error"
              style={{ marginLeft: 10 }}
              onClick={handleDeleteChannel}
              disabled={disabledButton}
              className="btn-danger"
            >
              {t('delete')}
            </Button>
          </Box>
        </>
      );
    }

    default:
      return null;
  }
};

const ModalChannel = ({
  open, handleClose, type, callback, itemChannel,
}) => (
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box style={styled.container}>
      <ContentModal
        type={type}
        handleClose={handleClose}
        callback={callback}
        itemChannel={itemChannel}
      />
    </Box>
  </Modal>
);

export default ModalChannel;
