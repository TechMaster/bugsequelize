# Sequelize bug report
 
## Description
 Synchronize from sequelize models to Postgresql non public schema causes error 'relation xxx does not exist'.
 Sequelize ignores schema property of model when creating references between models.
 
 
## Steps to reproduce
```
git clone https://github.com/TechMaster/bugsequelize.git
cd bugsequelize
edit ./config/config.json to properly connect to your Postgresql database
npm install
npm start
```

npm start will run syncdb.js file. The syncdb.js has commmand sequelize.sync()

In models folder, there are two models: Project and Task. Project hasMany Task. Task belongsTo Project.

In ./config/config.json, I defined non public schema in schema property. 
```json
{
  "development": {
    "username": "postgres",
    "password": "abc",
    "database": "payroll",
    "host"    : "payroll",
    "dialect" : "postgres",
    "schema"  : "cms"   //Non public schema
  }
}
```

When running syncdb.js, sequelize raise error 'relation "project" does not exist'

Here is generated SQL command
```sql
CREATE TABLE IF NOT EXISTS "cms"."task" ("id"  BIGSERIAL , "title" TEXT, "project_id" BIGINT REFERENCES "project" ("id") ON DELETE SET NULL ON UPDATE CASCADE, PRIMARY KEY ("id"));
```

To make this command runs correctly, REFERENCES "project" ("id") should be REFERENCES "targeted_schema"."project" ("id")