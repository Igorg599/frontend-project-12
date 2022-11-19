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
  listItem: {
    listStyleType: "none",
    height: 38,
  },
  button: {
    padding: "6px 12px",
    display: "flex",
    alignItems: "center",
    border: "none",
    font: "inherit",
    color: "inherit",
    backgroundColor: "transparent",
    height: "100%",
    width: "100%",
    cursor: "pointer",
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
}

export default styled
