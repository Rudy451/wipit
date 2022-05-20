import { Dialect, Sequelize } from "@sequelize/core";
require("dotenv").config({ path: `${__dirname}/../../.env` });

const HOST = process.env.HOST as string;
const DATABASE = process.env.LEGACYDATABASE as string;
const USER = process.env.USER as string;
const PASSWORD = process.env.PASSWORD as string;

const dbConfig = {
  host: HOST,
  dialect: "postgres" as Dialect,
  port: 5432,
  logging: false,
};

const sequelize = new Sequelize(
  DATABASE,
  USER,
  PASSWORD,
  dbConfig
);

export default sequelize;
