import { Box, OutlinedInput, Button, InputAdornment } from "@mui/material"
import { Formik } from "formik"
import { useSelector } from "react-redux"
import SendIcon from "@mui/icons-material/Send"
import { useEffect, useState, useContext, useCallback } from "react"
import { appUserSelector } from "store/userSlice"
import { SocketContext } from "context/socket"
import styled from "../styled"

const Messages = ({ currentChannel, messages }) => {
  const socket = useContext(SocketContext)
  const { currentUser } = useSelector(appUserSelector)
  const [channelMessages, setChanelMessages] = useState([])

  useEffect(() => {
    setChanelMessages(
      messages.filter((item) => item.channelName === currentChannel.name)
    )
  }, [messages, currentChannel])

  const handleUpdateChat = useCallback(
    (message) => {
      setChanelMessages([...channelMessages, message])
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
        <Box style={{ marginTop: 5 }}>{channelMessages.length} сообщений</Box>
      </Box>
      <Box style={styled.messageChat}>
        {channelMessages.length > 0 &&
          channelMessages.map((item) => (
            <Box key={item.id} style={{ marginBottom: 8 }}>
              <strong>{item.userName}:</strong> {item.textMessage}
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
                channelName: currentChannel.name,
                userName: currentUser,
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
                placeholder="Введите сообщение..."
                onBlur={handleBlur}
                size="small"
                endAdornment={
                  <InputAdornment position="end">
                    <Button
                      style={{ padding: "5px 5px 5px 0" }}
                      variant="text"
                      endIcon={<SendIcon />}
                      type="submit"
                      disabled={values === ""}
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
