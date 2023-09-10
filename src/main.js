const app = require('./app')
const { SERVER_PORT } = require('./config/server')
require('./utils/error-handle')

app.listen(SERVER_PORT, () => {
  console.log(`Server running: http://localhost:${SERVER_PORT}`)
})
