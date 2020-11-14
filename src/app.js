import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import serverless from 'serverless-http';
import cors from 'cors';

import router from './routes/index';

export const app = express();
app.use(cors());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/quotes', router);

export const handler = serverless(app);
