import { Box, OutlinedInput, Button, InputAdornment } from "@mui/material"
import { Formik } from "formik"
import { useSelector, useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import SendIcon from "@mui/icons-material/Send"
import { useEffect, useState, useContext, useCallback, useRef } from "react"
import { appUserSelector } from "store/userSlice"
import { SocketContext } from "context/socketContext"
import { actions as actionsMessages } from "store/messageSlice"
import styled from "../styled"

const Messages = ({ currentChannel, messages }) => {
  const dispatch = useDispatch()
  const socket = useContext(SocketContext)
  const { t } = useTranslation()
  const { currentUser } = useSelector(appUserSelector)
  const [channelMessages, setChanelMessages] = useState([])
  const inputRef = useRef(null)

  useEffect(() => {
    if (currentChannel) {
      setChanelMessages(
        messages.filter((item) => item.channelId === currentChannel.id)
      )
    }
  }, [messages, currentChannel])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [currentChannel])

  const handleUpdateChat = useCallback(
    (message) => {
      setChanelMessages([...channelMessages, message])
      dispatch(actionsMessages.addMessage(message))
    },
    [channelMessages]
  )

  useEffect(() => {
    socket.on("newMessage", handleUpdateChat)

    return () => {
      socket.off("newMessage", handleUpdateChat)
    }
  }, [handleUpdateChat])

  return (
    <Box style={styled.messageContainer}>
      <Box style={styled.messageHeader}>
        <Box style={{ fontWeight: 600 }}>
          # {currentChannel && currentChannel.name}
        </Box>
        <Box style={{ marginTop: 5 }}>
          {t("messages.key", {
            count: channelMessages.length,
          })}
        </Box>
      </Box>
      <Box style={styled.messageChat}>
        {channelMessages.length > 0 &&
          channelMessages.map((item) => (
            <Box key={item.id} style={{ marginBottom: 8 }}>
              <strong>{item.username}:</strong> {item.textMessage}
            </Box>
          ))}
      </Box>
      <Box style={styled.messageForm}>
        <Formik
          initialValues={{ message: "" }}
          onSubmit={(values, action) => {
            socket.emit(
              "newMessage",
              {
                channelId: currentChannel.id,
                username: currentUser,
                textMessage: values.message,
              },
              (res) => {
                if (res.status === "ok") {
                  action.resetForm()
                }
              }
            )
          }}
        >
          {({ values, handleChange, handleBlur, handleSubmit }) => (
            <form style={{ width: "100%" }} onSubmit={handleSubmit}>
              <OutlinedInput
                name="message"
                type="text"
                value={values.message}
                onChange={handleChange}
                placeholder={t("enterMessage")}
                onBlur={handleBlur}
                size="small"
                inputRef={inputRef}
                endAdornment={
                  <InputAdornment position="end">
                    <Button
                      style={{ padding: "5px 5px 5px 0" }}
                      variant="text"
                      endIcon={<SendIcon />}
                      type="submit"
                      disabled={values.message === ""}
                    />
                  </InputAdornment>
                }
                style={{ width: "100%" }}
              />
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  )
}

export default Messages
