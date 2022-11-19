import { Box, OutlinedInput, Button, InputAdornment } from "@mui/material"
import { Formik } from "formik"
import { useSelector } from "react-redux"
import SendIcon from "@mui/icons-material/Send"
import { useEffect, useState } from "react"
import { io } from "socket.io-client"
import { appUserSelector } from "../../../store/userSlice"
import styled from "../styled"

const socket = io()

const Messages = ({ activeChannel, messages }) => {
  const { currentUser } = useSelector(appUserSelector)
  const [channelMessages, setChanelMessages] = useState([])

  useEffect(() => {
    setChanelMessages(
      messages.filter((item) => item.channelName === activeChannel.name)
    )
  }, [messages])

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connect")
    })

    return () => {
      socket.off("Connect")
    }
  }, [])

  return (
    <Box style={styled.messageContainer}>
      <Box style={styled.messageHeader}>
        <Box style={{ fontWeight: 600 }}>
          # {activeChannel && activeChannel.name}
        </Box>
        <Box style={{ marginTop: 5 }}>{channelMessages.length} сообщений</Box>
      </Box>
      <Box style={styled.messageForm}>
        <Formik
          initialValues={{ message: "" }}
          onSubmit={(values, action) => {
            socket.emit(
              "newMessage",
              {
                channelName: activeChannel.name,
                userName: currentUser,
                textMessage: values.message,
              },
              (res) => {
                if (res.status === "ok") {
                  action.resetForm()
                  console.log(res)
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
