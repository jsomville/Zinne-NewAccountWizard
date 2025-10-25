import express from 'express';
import cors from 'cors'

import home_route from './routes/home_route.js';
import api_route from './routes/api_route.js';
import payment_route from './routes/payment_route.js';
import wizard_route from './routes/wizard_route.js';

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

//Set view engine
app.set('view engine', 'ejs');

//Add routes
app.use(express.static('public'));
app.use('/', home_route);
app.use('/api', api_route);
app.use('/payment', payment_route);
app.use('/wizard', wizard_route);
app.use('/register', wizard_route);

export { app };
