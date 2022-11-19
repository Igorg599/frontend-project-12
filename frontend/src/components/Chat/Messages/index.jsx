import {
  Box,
  FormControl,
  OutlinedInput,
  Button,
  InputAdornment,
} from "@mui/material"
import { Formik } from "formik"
import SendIcon from "@mui/icons-material/Send"
import { useEffect, useState } from "react"
import { io } from "socket.io-client"
import styled from "../styled"

const socket = io()

const Messages = ({ activeChannel, messages }) => {
  const [chanelMessages, setChanelMessages] = useState(
    messages.filter((item) => item.channel === activeChannel)
  )

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connect")
    })

    return () => {
      socket.off("Disconnect")
    }
  }, [])

  return (
    <Box style={styled.messageContainer}>
      <Box style={styled.messageHeader}>
        <Box style={{ fontWeight: 600 }}>
          # {activeChannel && activeChannel.name}
        </Box>
        <Box style={{ marginTop: 5 }}>{chanelMessages.length} сообщений</Box>
      </Box>
      <Box style={styled.messageForm}>
        <Formik
          initialValues={{ message: "" }}
          onSubmit={(values, action) => {
            console.log(values)
            action.resetForm()
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
