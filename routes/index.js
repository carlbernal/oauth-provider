const oauth = require('./oauth')


module.exports = (app) => {
  app.get('/', (req, res) => {
    res.render('index')
  });
  app.use('/oauth', oauth)
}