import { Formik } from "formik"
import { TextField, Button } from "@material-ui/core"

const Login = () => (
  <div>
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={(values) => {
        const errors = {}
        if (!values.email) {
          errors.email = "Required"
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address"
        }
        return errors
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log(JSON.stringify(values, null, 2))
          setSubmitting(false)
        }, 400)
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
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            className="login-input"
            variant="outlined"
            label="email"
          />
          {errors.email && touched.email && errors.email}
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
