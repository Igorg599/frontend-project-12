const styled = {
  channels: {
    borderRight: "1px solid #dee2e6",
    width: 200,
    height: "calc(100% - 78px)",
    padding: "48px 10px 30px 10px",
    fontSize: 16,
    backgroundColor: "#FFFAFA",
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 10,
    marginBottom: 20,
  },
  list: {
    overflow: "auto",
    height: "calc(100% - 30px)",
  },
  listItem: {
    listStyleType: "none",
    minHeight: 33,
    wordBreak: "break-word",
    display: "flex",
  },
  button: {
    padding: "6px 12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    border: "none",
    height: "100%",
    textAlign: "left",
    flex: 1,
  },
  buttonArrow: {
    padding: "6px 12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    border: "none",
    height: "100%",
    textAlign: "left",
    maxWidth: "38px",
    minWidth: "38px",
  },
  messageContainer: {
    flex: 1,
    height: "calc(100% - 76px)",
    paddingBottom: 76,
    position: "relative",
  },
  messageHeader: {
    padding: 16,
    marginBottom: 24,
    backgroundColor: "#FFFAFA",
    boxShadow: "0 .125rem .25rem rgba(0,0,0,.075)",
  },
  messageForm: {
    width: "calc(100% - 96px)",
    position: "absolute",
    display: "flex",
    bottom: 0,
    height: 44,
    padding: "16px 48px",
  },
  messageChat: {
    padding: "0 48px",
    overflow: "auto",
    height: "calc(100% - 100px)",
  },
}

export default styled
