import { Box, OutlinedInput, Button, InputAdornment } from "@mui/material"
import { Formik } from "formik"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import SendIcon from "@mui/icons-material/Send"
import { useEffect, useState, useContext, useRef } from "react"
import filter from "leo-profanity"
import { appUserSelector } from "store/userSlice"
import { SocketContext } from "context/socketContext"
import styled from "../styled"

const Messages = ({ currentChannel, messages }) => {
  const socket = useContext(SocketContext)
  const { t } = useTranslation()
  const { currentUser } = useSelector(appUserSelector)
  const [channelMessages, setChanelMessages] = useState([])
  const inputRef = useRef(null)
  const messagesEndRef = useRef(null)

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView()
  }, [channelMessages])

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
        <div ref={messagesEndRef} />
      </Box>
      <Box style={styled.messageForm}>
        <Formik
          initialValues={{ message: "" }}
          onSubmit={(values, action) => {
            const cenzureText = filter.clean(values.message)

            socket.emit(
              "newMessage",
              {
                channelId: currentChannel.id,
                username: currentUser,
                textMessage: cenzureText,
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
