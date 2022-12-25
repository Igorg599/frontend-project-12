const style = {
  container: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    backgroundColor: '#fff',
    borderRadius: '11px',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 150,
  },
  header: {
    display: 'flex',
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 30,
    maxHeight: 35,
    borderBottom: '1px solid #dee2e6',
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
  },
  input: {
    padding: '16px 16px 8px',
    width: 'calc(100% - 32px)',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0 16px 16px',
  },
  delete: {
    padding: '16px 16px 8px',
    fontSize: 20,
  },
  error: {
    padding: '0 16px 8px',
    color: 'red',
  },
  label: {
    clip: 'rect(0, 0, 0, 0)',
    border: 0,
    height: '1px',
    margin: '-1px',
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: '1px',
  },
};

export default style;
