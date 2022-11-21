import { Box, Typography, Modal, TextField, Button } from "@mui/material"
import { Formik } from "formik"
import CloseIcon from "@mui/icons-material/Close"
import styled from "./styled"

const ContentModal = ({ handleClose, type, callback }) => {
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
            initialValues={{ nameChannel: "" }}
            onSubmit={(values, action) => {
              callback(values.nameChannel)
                .then(() => {
                  handleClose()
                })
                .catch((err) => {
                  action.setErrors({ nameChannel: err.message })
                })
            }}
          >
            {({ values, handleChange, handleBlur, handleSubmit, errors }) => (
              <form style={{ width: "100%" }} onSubmit={handleSubmit}>
                <TextField
                  style={styled.input}
                  size="small"
                  value={values.nameChannel}
                  type="text"
                  name="nameChannel"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  error={!!errors.nameChannel}
                />
                {errors.nameChannel && (
                  <Box style={styled.error}>{errors.nameChannel}</Box>
                )}
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

const ModalChannel = ({ open, handleClose, type, callback }) => (
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box style={styled.container}>
      <ContentModal type={type} handleClose={handleClose} callback={callback} />
    </Box>
  </Modal>
)

export default ModalChannel
