const apiPath = "/api/v1"

export default {
  loginPath: () => [apiPath, "login"].join("/"),
  registerPath: () => [apiPath, "signup"].join("/"),
  getData: () => [apiPath, "data"].join("/"),
}
