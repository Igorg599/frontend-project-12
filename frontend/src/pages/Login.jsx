import { Formik } from "formik"
import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import axios from "axios"
import { TextField, Button, Box } from "@material-ui/core"
import * as Yup from "yup"
import routes from "utils/routes"
import useAuth from "hooks/useAuth"
import useLocalStorage from "hooks/useLokalStorage"

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, "Слишком короткий логин")
    .required("Обязательное поле"),
  password: Yup.string()
    .required("Пароль обязателен для ввода")
    .min(4, "Слишком короткий пароль"),
})

const Login = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [authFailed, setAuthFailed] = useState(false)
  const [, setValueToken] = useLocalStorage("token")
  const [, setValueUsername] = useLocalStorage("userName")

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={SignupSchema}
      onSubmit={async (values) => {
        setAuthFailed(false)

        try {
          const res = await axios.post(routes.loginPath(), values)
          setValueToken(res.data.token)
          setValueUsername(values.username)
          setTimeout(() => {
            auth.logIn()
            const { from } = location.state || { from: { pathname: "/" } }
            navigate(from)
          })
        } catch (err) {
          if (err.isAxiosError && err.response.status === 401) {
            setAuthFailed(true)
            return
          }
          throw err
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
            value={values.username}
            className="login-input"
            variant="outlined"
            label="username"
            error={authFailed}
            autoFocus
          />
          <Box style={{ color: "red" }}>
            {errors.username && touched.username && errors.username}
          </Box>
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
          <Box style={{ color: "red" }}>
            {errors.password && touched.password && errors.password}
          </Box>
          {authFailed && (
            <Box style={{ color: "red", marginTop: 10 }}>
              Неверный логин или пароль
            </Box>
          )}
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="contained"
            color="primary"
            style={{ marginTop: 30 }}
          >
            Войти
          </Button>
          <Box
            style={{
              width: "100%",
              marginTop: 20,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <span>Нет аккаунта?&nbsp;</span>
            <a href="/signup" style={{ outline: "none " }}>
              Регистрация
            </a>
          </Box>
        </form>
      )}
    </Formik>
  )
}

export default Login
