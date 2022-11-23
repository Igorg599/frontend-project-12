import { Box, Typography, Modal, TextField, Button } from "@mui/material"
import { useCallback } from "react"
import { Formik } from "formik"
import CloseIcon from "@mui/icons-material/Close"
import styled from "./styled"

const ContentModal = ({ handleClose, type, callback, itemChannel }) => {
  const handleDeleteChannel = useCallback(() => {
    callback({ id: itemChannel.id })
      .then(() => {
        handleClose()
      })
      .catch((err) => console.log(err))
  }, [itemChannel, callback])

  switch (type) {
    case "update":
    case "create": {
      return (
        <>
          <Box style={styled.header}>
            <Typography style={styled.title}>
              {type === "create" ? "Создать канал" : "Переименовать канал"}
            </Typography>
            <CloseIcon onClick={handleClose} style={{ cursor: "pointer" }} />
          </Box>
          <Formik
            initialValues={{ name: type === "create" ? "" : itemChannel.name }}
            onSubmit={(values, action) => {
              callback(
                type === "create"
                  ? { channelName: values.name }
                  : { channelName: values.name, id: itemChannel.id }
              )
                .then(() => {
                  handleClose()
                })
                .catch((err) => {
                  action.setErrors({ name: err.message })
                })
            }}
          >
            {({ values, handleChange, handleBlur, handleSubmit, errors }) => (
              <form style={{ width: "100%" }} onSubmit={handleSubmit}>
                <label style={{ display: "none" }} htmlFor="name">
                  Имя канала
                </label>
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
                {errors.name && <Box style={styled.error}>{errors.name}</Box>}
                <Box style={styled.buttons}>
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={handleClose}
                    type="button"
                  >
                    Отменить
                  </Button>
                  <Button
                    variant="contained"
                    style={{ marginLeft: 10 }}
                    type="submit"
                  >
                    Отправить
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </>
      )
    }

    case "delete": {
      return (
        <>
          <Box style={styled.header}>
            <Typography style={styled.title}>Удалить канал</Typography>
            <CloseIcon onClick={handleClose} style={{ cursor: "pointer" }} />
          </Box>
          <Typography style={styled.delete}>Уверены?</Typography>
          <Box style={styled.buttons}>
            <Button variant="contained" color="inherit" onClick={handleClose}>
              Отменить
            </Button>
            <Button
              variant="contained"
              color="error"
              style={{ marginLeft: 10 }}
              onClick={handleDeleteChannel}
            >
              Удалить
            </Button>
          </Box>
        </>
      )
    }

    default:
      return null
  }
}

const ModalChannel = ({ open, handleClose, type, callback, itemChannel }) => (
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
)

export default ModalChannel
