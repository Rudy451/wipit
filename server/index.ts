require('dotenv').config({ path: `${__dirname}/../.env` });
import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import * as redis from 'redis';
import connectRedis from 'connect-redis';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './models/index';
//import { v4 as uuidv4 } from 'uuid';

 declare module "express-session" {
  interface Session {
    profileId?: {[key:string]: any},
    email?: {[key:string]: any},
    name?: {[key:string]: any},
    type?: {[key:string]: any}
  }
}

const router = require('./router');

const app = express();
const host = process.env.HOST;
const nodejsPort = process.env.NODEJS_PORT;
const redisPort = process.env.REDIS_PORT;
const redisClient = redis.createClient({
  legacyMode: true,
  socket: {
    host: host,
    port: parseInt(redisPort as string)
  }
});

redisClient.on('connect', (res:string) => {
  console.log(`listening on ${host}:${redisPort}...`);
});

redisClient.on('error', (err:string) => {
  console.log("Error occurred....:", err);
});

const redisStore = connectRedis(session);
const sessionTokenStore = new redisStore({client: redisClient});

const oneDay = 1000 * 60 * 60 * 24;
const corsOptions = {
  origin: true,
  credentials: true,
}

app.use(cookieParser());
app.use(session({
  store: sessionTokenStore,
  secret: process.env.SECRET as string,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: oneDay
  },
  resave: false
}));
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json());
app.use(express.json());
app.use(router);

async function bootstrap(){
  await redisClient.connect();
  await db.sequelize.sync()
  app.listen(nodejsPort, () => {
    console.log(`listening on ${host}:${nodejsPort}...`);
  })
};

bootstrap();
export default redisClient;
