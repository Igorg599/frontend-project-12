import {
  Route,
  Routes,
  BrowserRouter,
  Outlet,
  Navigate,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import i18n from 'i18n';
import filterLeo from 'leo-profanity';
import { ToastContainer } from 'react-toastify';
import useAuth from 'hooks/useAuth';
import {
  Home, Login, NotFound, Registration,
} from 'pages';
import store from 'store';
import { actions as actionsChannels } from 'store/channelSlice';
import { actions as actionsMessages } from 'store/messageSlice';
import { AuthProvider } from 'context/authContext';
import { SocketContext, socket } from 'context/socketContext';
import SideBar from 'components/SideBar';

socket.on('newChannel', (channel) => {
  store.dispatch(actionsChannels.addChannel(channel));
});
socket.on('renameChannel', (props) => {
  store.dispatch(actionsChannels.renameChannel(props));
});
socket.on('removeChannel', (props) => {
  store.dispatch(actionsChannels.removeChannel(props));
});
socket.on('newMessage', (message) => {
  store.dispatch(actionsMessages.addMessage(message));
});

const UseOutlet = () => {
  const auth = useAuth();
  return auth.loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
  environment: 'production',
};

const App = () => {
  const ruLng = filterLeo.getDictionary('ru');
  filterLeo.add(ruLng);

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <SocketContext.Provider value={socket}>
              <AuthProvider>
                <SideBar />
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<UseOutlet />}>
                      <Route path="" element={<Home />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Registration />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
                <ToastContainer />
              </AuthProvider>
            </SocketContext.Provider>
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default App;
