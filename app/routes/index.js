var quizRoutes = require('./quiz_routes')

module.exports = function(app, db) {
  app.use('/api', quizRoutes);
}
