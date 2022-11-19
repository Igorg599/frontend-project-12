import { Box } from "@mui/material"
import { useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { appChannelsSelector } from "../../store/channelSlice"
import Channels from "./Channels"
import Messages from "./Messages"

const Chat = () => {
  const { channels, messages } = useSelector(appChannelsSelector)
  const [activeChannelId, setActiveChannelId] = useState(1)

  const activeChannel = useMemo(() => {
    if (channels.length > 0) {
      return channels.filter((item) => item.id === activeChannelId)[0]
    }
    return null
  }, [activeChannelId, channels])

  return (
    <Box style={{ display: "flex", height: "100%" }}>
      <Channels
        channels={channels}
        activeChannelId={activeChannelId}
        setActiveChannelId={setActiveChannelId}
      />
      <Messages messages={messages} activeChannel={activeChannel} />
    </Box>
  )
}

export default Chat
