require('dotenv').config({ path: `${__dirname}/../.env` });
import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
import db from './models/index';
import { v4 as uuidv4 } from 'uuid';

const router = require('./router');

const app = express();
const port = 3456;

const oneDay = 1000 * 60 * 60 * 24;

app.use(cookieParser());
app.use(session({
  genid: (req) => uuidv4(),
  secret: process.env.SECRET as string,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: oneDay
  },
  resave: false
}));
app.use(cors());
app.use(express.json());
app.use(router);

async function bootstrap () {
  await db.sequelize.sync();
  app.listen(port, () => {
    console.log(`I'm listening on port ${port}`);
  })
}

bootstrap();
