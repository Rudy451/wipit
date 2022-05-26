require('dotenv').config({ path: `${__dirname}/../.env` });
import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import path from 'path';
import * as redis from 'redis';
import connectRedis from 'connect-redis';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './models/index';
import { rmSync } from 'fs';

// Add user properties to cached session for testing in tests/test.ts
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
const nodejsPort = process.env.NODE_ENV == 'development' ? process.env.NODEJS_PORT : process.env.PORT;
const redisPort = process.env.REDIS_PORT;
const redisClient = process.env.NODE_ENV == 'development' ?
  redis.createClient({
    legacyMode: true,
    socket: {
      host: host,
      port: parseInt(redisPort as string)
    }
  }) :
  // Grab Redis URL from Heroku Redis
  redis.createClient({
    url: process.env.REDIS_URL,
    legacyMode: true
  });


redisClient.on('connect', () => {
  // Comment out during testing...
  console.log(`listening on ${host}:${redisPort}...`);
});

redisClient.on('error', (err:string) => {
  // Comment out during testing...
  console.log('Error occurred....:', err);
});

// Redis store for caching session data
const redisStore = connectRedis(session);
const sessionTokenStore = new redisStore({client: redisClient});

// Session can last up to one day
const oneDay = 1000 * 60 * 60 * 24;
// Allows us to pass cookies containing session data (connect.sid)
const corsOptions = {
  origin: true,
  credentials: true,
}

// Serving React files server side for Heroku deployment
app.use(express.static(path.join(__dirname, '../client/wip-app/build')));
app.use(cookieParser());
// Session data stored in Redis Client
app.use(session({
  store: sessionTokenStore,
  secret: process.env.SECRET as string,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: oneDay,
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

// Connect Redis Client, Database & Express Server
async function bootstrap(){
  await redisClient.connect();
  await db.sequelize.sync()
  await app.listen(nodejsPort, () => {
    console.log(`listening on ${host}:${nodejsPort}...`);
  });
};

// Comment out during testing...
bootstrap();

// Export Express Server/Data & Redis Client for testing
export {
  redisClient,
  app,
  nodejsPort
}
