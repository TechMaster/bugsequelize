const config = require('../config/config');

module.exports = function (sequelize, DataTypes) {

  const Task = sequelize.define('Task', {
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
      tableName: 'task',

      classMethods: {
        associate: function (models) {
          Task.belongsTo(models.Project, {
              foreignKey: {     //Mặc định foreign key là Nullable
                name: 'project_id',  //Nếu muốn bắt buộc foreign_key not null thì phải đổi tên foreign key mặc định
                allowNull: false
              },
              onDelete: 'CASCADE' //Nếu xóa project thì xóa cả Task
            }
          );
        }
      }
    }
  );

  return Task;
};

