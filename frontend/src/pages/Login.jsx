import { Formik } from "formik"
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { TextField, Button } from "@material-ui/core"
import * as Yup from "yup"
import routes from '../utils/routes'

const SignupSchema = Yup.object().shape({
  username: Yup.string().min(4, "Слишком короткий логин").required("Обязательное поле"),
  password: Yup.string()
    .required("Пароль обязателен для ввода")
    .min(4, "Слишком короткий пароль"),
})

const Login = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [authFailed, setAuthFailed] = useState(false)

  return (
    <div>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
          setAuthFailed(false)

          try {
            const res = await axios.post(routes.loginPath(), values)
            localStorage.setItem('userId', JSON.stringify(res.data))
            const { from } = location.state || { from: { pathname: '/' } }
            navigate(from)
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
              type="text"
              name="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.login}
              className="login-input"
              variant="outlined"
              label="username"
              error={authFailed}
            />
            {errors.login && touched.login && errors.login}
            <TextField
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              style={{ marginTop: 30 }}
              variant="outlined"
              label="password"
              error={authFailed}
            />
            {errors.password && touched.password && errors.password}
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="contained"
              color="primary"
              style={{ marginTop: 30 }}
            >
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default Login
