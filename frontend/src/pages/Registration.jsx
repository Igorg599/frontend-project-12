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
    .min(3, "От 3 до 20 символов")
    .max(20, "От 3 до 20 символов")
    .required("Обязательное поле"),
  password: Yup.string()
    .required("Пароль обязателен для ввода")
    .min(6, "Не менее 6 символов"),
  confirmPassword: Yup.string()
    .required("Пароль обязателен для ввода")
    .min(6, "Не менее 6 символов"),
})

const Registration = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [authFailed, setAuthFailed] = useState(false)
  const [, setValueToken] = useLocalStorage("token")
  const [, setValueUsername] = useLocalStorage("userName")

  return (
    <Formik
      initialValues={{ username: "", password: "", confirmPassword: "" }}
      validationSchema={SignupSchema}
      onSubmit={async (values, action) => {
        const { username, password, confirmPassword } = values

        setAuthFailed(false)
        action.setErrors({})

        if (password !== confirmPassword) {
          action.setErrors({ confirmPassword: "Пароли должны совпадать" })
          return
        }

        try {
          const res = await axios.post(routes.registerPath(), {
            username,
            password,
          })
          setValueToken(res.data.token)
          setValueUsername(username)
          setTimeout(() => {
            auth.logIn()
            const { from } = location.state || { from: { pathname: "/" } }
            navigate(from)
          })
        } catch (err) {
          if (err.isAxiosError && err.response.status === 409) {
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
          />
          <Box style={{ color: "red" }}>
            {errors.password && touched.password && errors.password}
          </Box>
          <TextField
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.confirmPassword}
            style={{ marginTop: 30 }}
            variant="outlined"
            label="confirmPassword"
          />
          <Box style={{ color: "red" }}>
            {errors.confirmPassword &&
              touched.confirmPassword &&
              errors.confirmPassword}
          </Box>
          {authFailed && (
            <Box style={{ color: "red", marginTop: 10 }}>
              Такой пользователь уже существует
            </Box>
          )}
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="contained"
            color="primary"
            style={{ marginTop: 30 }}
          >
            Зарегистрироваться
          </Button>
        </form>
      )}
    </Formik>
  )
}

export default Registration
