const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const app = express();
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const AppError = require('./utilities/appError');
const globalErrorHandler = require('./controller/errorController');

app.use(helmet());
app.use(express.json({ limit: '10kb' }));

//Data sanitisation against NoSQL query injection,
app.use(mongoSanitize());

// Data sanitisation against XSS
app.use(xss());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP. Please try again in an hour',
});

app.use('/api', limiter);

app.use(hpp({ whitelist: ['duration', 'ratingsQuantity', 'ratingsAverage', 'maxGroupSize', 'difficulty', 'price'] }));
// Custom middleware
/*
app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});
 */
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

/* app.get('/api/v1/tours', handleGetTours);

app.get('/api/v1/tours/:id', handleGetTour);

app.patch('/api/v1/tours/:id', handleUpdateTour);

app.post('/api/v1/tours', handleCreateTour); */

app.use('/api/v1/tours', tourRouter);

app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server !`, '404'));
});

app.use(globalErrorHandler);

module.exports = app;
