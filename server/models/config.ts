import { Dialect, Sequelize } from "@sequelize/core";
require("dotenv").config({ path: `${__dirname}/../../.env` });

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
  use_env_variable: process.env.DATABASE_URL,
  dialect: "postgres" as Dialect,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
};

const sequelize = new Sequelize(
  DATABASE,
  USER,
  PASSWORD,
  dbConfig
);

export default sequelize;
