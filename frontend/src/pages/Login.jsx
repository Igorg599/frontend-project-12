import { Formik } from "formik"
import { TextField, Button } from "@material-ui/core"
import * as Yup from "yup"

const SignupSchema = Yup.object().shape({
  login: Yup.string().min(4, "Слишком короткий логин").required("Обязательное поле"),
  password: Yup.string()
    .required("Пароль обязателен для ввода")
    .min(4, "Слишком короткий пароль"),
})

const Login = () => (
  <div>
    <Formik
      initialValues={{ login: "", password: "" }}
      validationSchema={SignupSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log(JSON.stringify(values, null, 2))
        setSubmitting(false)
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
            name="login"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.login}
            className="login-input"
            variant="outlined"
            label="login"
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

export default Login
