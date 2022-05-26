import { Dialect, Sequelize } from "@sequelize/core";
require("dotenv").config({ path: `${__dirname}/../../.env` });

// Database credentials from env file
const HOST = process.env.HOST as string;
const DATABASE = process.env.LEGACYDATABASE as string;
const USER = process.env.USER as string;
const PASSWORD = process.env.PASSWORD as string;

const dbConfig = process.env.NODE_ENV == 'development' ?
{
  host: HOST,
  dialect: "postgres" as Dialect,
  port: 5432,
  logging: false,
} : {
  // Pull database url from Heroku Postgres (dynamic)
  use_env_variable: process.env.DATABASE_URL as string,
  dialect: "postgres" as Dialect,
  dialectOptions: {
    // Security purposes
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
};

// New sequelize instance for local dev
const sequelize = process.env.NODE_ENV == 'development' ?
new Sequelize(
  DATABASE,
  USER,
  PASSWORD,
  dbConfig
) :
// Pull database url from Heroku Postgres
new Sequelize(
  process.env.DATABASE_URL as string, {
  dialect: 'postgres' as Dialect,
  protocol: 'postgres'
})

export default sequelize;
