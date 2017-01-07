
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import EventController from './controllers/EventController';
import config from './config';


const app = express();
const server = http.createServer(app);
const router = express.Router();

app.use(bodyParser.json());
app.use(router);
app.use((error, req, res, next) => { // eslint-disable-line
  console.error(error);
  if (req.app.get('env') !== 'development') {
    delete error.stack; // eslint-disable-line
  }
  res.status(error.statusCode || 500).json(error);
});


router.route('/api/v1/event')
  .post((req, res, next) => {
    EventController.createEvent(req.body).then((event) => {
      res.json(event);
    }).catch(next);
  });

router.route('/api/v1/event/list')
  .get((req, res, next) => {
    EventController.getEvents().then((events) => {
      res.json(events);
    }).catch(next);
  });

router.route('/api/v1/event/:id')
  .get((req, res, next) => {
    EventController.getEvent(req.params.id).then((event) => {
      res.json(event);
    }).catch(next);
  });

router.route('/api/v1/event/:id/vote')
  .post((req, res, next) => {
    EventController.voteOnEvent(req.params.id, req.body).then((event) => {
      res.json(event);
    }).catch(next);
  });

router.route('/api/v1/event/:id/results')
  .get((req, res, next) => {
    EventController.getEventResults(req.params.id).then((results) => {
      res.json(results);
    }).catch(next);
  });

server.listen(config.port);
