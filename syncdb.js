const db = require('./models');

db.sequelize.sync({force: true}).then(function () {
  console.log('Database schema is synchronized successfully');
}).catch(function (error) {
  console.log('Error when synchronizing db ', error);
});
