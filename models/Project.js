module.exports = function (db, DataTypes) {
  const Project = db.define('Project', {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      title: DataTypes.TEXT

    }, {
      schema: db.schema,
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
