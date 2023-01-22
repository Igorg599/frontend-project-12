import { Formik } from 'formik';
import { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import AuthContext from 'context/authContext';
import routes from 'utils/routes';
import useAuth from 'hooks/useAuth';
import useLocalStorage from 'hooks/useLokalStorage';

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { setCurrentUser } = useContext(AuthContext);
  const { t } = useTranslation();
  const [authFailed, setAuthFailed] = useState(false);
  const [, setValueToken] = useLocalStorage('token');
  const [, setValueUsername] = useLocalStorage('userName');

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(4, t('errors.shortName'))
      .required(t('errors.requiredName')),
    password: Yup.string()
      .required(t('errors.requiredPassword'))
      .min(4, t('errors.shortPassword')),
  });

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={SignupSchema}
      onSubmit={async (values) => {
        setAuthFailed(false);

        try {
          const res = await axios.post(routes.loginPath(), values);
          setValueToken(res.data.token);
          setValueUsername(values.username);
          setTimeout(() => {
            setCurrentUser(values.username);
            auth.logIn(res.data.token);
            const { from } = location.state || { from: { pathname: '/' } };
            navigate(from);
          });
        } catch (err) {
          if (err.isAxiosError && err.response.status === 401) {
            setAuthFailed(true);
            return;
          }
          throw err;
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit} className="login-form">
          <TextField
            id="login-username"
            type="text"
            name="username"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
            className="login-input"
            variant="outlined"
            label={t('nick')}
            error={authFailed}
            autoFocus
          />
          <Box style={{ color: 'red' }}>
            {errors.username && touched.username && errors.username}
          </Box>
          <TextField
            id="login-password"
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            style={{ marginTop: 30 }}
            variant="outlined"
            label={t('password')}
            error={authFailed}
          />
          <Box style={{ color: 'red' }}>
            {errors.password && touched.password && errors.password}
          </Box>
          {authFailed && (
            <Box style={{ color: 'red', marginTop: 10 }}>
              {t('errors.verification')}
            </Box>
          )}
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="contained"
            color="primary"
            style={{ marginTop: 30 }}
          >
            {t('signIn')}
          </Button>
          <Box
            style={{
              width: '100%',
              marginTop: 20,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <span>
              {t('not')}
&nbsp;
            </span>
            <a href="/signup" style={{ outline: 'none ' }}>
              {t('register')}
            </a>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Login;
