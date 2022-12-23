import { Formik } from "formik"
import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import axios from "axios"
import { TextField, Button, Box } from "@material-ui/core"
import * as Yup from "yup"
import routes from "utils/routes"
import useAuth from "hooks/useAuth"
import useLocalStorage from "hooks/useLokalStorage"

const Registration = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()
  const [authFailed, setAuthFailed] = useState(false)
  const [, setValueToken] = useLocalStorage("token")
  const [, setValueUsername] = useLocalStorage("userName")

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, t("errors.minMaxName"))
      .max(20, t("errors.minMaxName"))
      .required(t("errors.requiredName")),
    password: Yup.string()
      .required(t("errors.requiredPassword"))
      .min(6, t("errors.minPassword")),
    confirmPassword: Yup.string()
      .required(t("errors.requiredPassword"))
      .oneOf([Yup.ref("password"), null], t("errors.matchPasswords")),
  })

  return (
    <Formik
      initialValues={{ username: "", password: "", confirmPassword: "" }}
      validationSchema={SignupSchema}
      onSubmit={async (values, action) => {
        const { username, password, confirmPassword } = values

        setAuthFailed(false)
        action.setErrors({})

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
            id="registration-username"
            type="text"
            name="username"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
            className="login-input"
            variant="outlined"
            label={t("nameUser")}
            autoFocus
          />
          <Box style={{ color: "red" }}>
            {errors.username && touched.username && errors.username}
          </Box>
          <TextField
            id="registration-password"
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            style={{ marginTop: 30 }}
            variant="outlined"
            label={t("password")}
          />
          <Box style={{ color: "red" }}>
            {errors.password && touched.password && errors.password}
          </Box>
          <TextField
            id="registration-confirmPassword"
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.confirmPassword}
            style={{ marginTop: 30 }}
            variant="outlined"
            label={t("confirmPassword")}
          />
          <Box style={{ color: "red" }}>
            {errors.confirmPassword &&
              touched.confirmPassword &&
              errors.confirmPassword}
          </Box>
          {authFailed && (
            <Box style={{ color: "red", marginTop: 10 }}>
              {t("errors.existUser")}
            </Box>
          )}
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="contained"
            color="primary"
            style={{ marginTop: 30 }}
          >
            {t("signUp")}
          </Button>
        </form>
      )}
    </Formik>
  )
}

export default Registration
