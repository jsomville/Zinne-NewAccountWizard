import express from 'express';
import cors from 'cors'

import home_route from './routes/home_route.js';
import api_route from './routes/api_route.js';

// Create Express object
const app = express();

//Use cors
const corsOptions = {
  origin: '*',
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
}
app.use(cors(corsOptions));

//Hardening
app.disable('x-powered-by');
app.set('trust proxy', true);

//Add Middleware
app.use(express.json()); //Json parsing
app.use(express.urlencoded({ extended: false })); //url encoder

//Add routes
//app.use('/', home_route);
app.use(express.static('public'));
app.use('/api', api_route);


export { app };
