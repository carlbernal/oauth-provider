const oauth = require('./oauth')
const admin = require('./admin')

module.exports = (app) => {
  app.use('/', admin)
  app.use('/oauth', oauth)
}