const config = require('../config/config');

module.exports = function (sequelize, DataTypes) {
  const Project = sequelize.define('Project', {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      title: DataTypes.TEXT

    }, {
      schema: config.schema,
      timestamps: false,
      paranoid: true,
      underscored: true,
      freezeTableName: true,
      tableName: 'project',

      classMethods: {
        associate: function (models) {
          Project.hasMany(models.Task)
        }
      }
    }
  );
  return Project;
};
