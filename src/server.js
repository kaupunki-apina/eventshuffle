
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import EventController from './controllers/EventController';
import config from './config';


(function () {
  const app = express();
  const server = http.createServer(app);
  const router = express.Router();

  app.use(bodyParser.json());
  app.use(router);
  app.set('json spaces', 2); // Pretty print

  router.route('/api/v1/event')
    .post((req, res) => {
      EventController.createEvent(req).then((event) => {
        res.json(event);
      }).catch((error) => {
        console.log(error); // TODO Better error logging
        res.json({});
      });
    });

  router.route('/api/v1/event/list')
    .get((req, res) => {
      EventController.getEvents().then((events) => {
        res.json(events);
      }).catch((error) => {
        console.log(error); // TODO Better error logging
        res.json([]);
      });
    });

  router.route('/api/v1/event/:id')
    .get((req, res) => {
      EventController.getEvent(req.params.id).then((event) => {
        res.json(event);
      }).catch((error) => {
        console.log('error: ', error); // TODO Better error logging
        res.json({});
      });
    });

  router.route('/api/v1/event/:id/vote')
    .get((req, res) => {
      // Return the voted on event
      res.json({});
    });

  router.route('/api/v1/event/:id/results')
    .get((req, res) => {
      // Return the event along with the most voted on dates (and voters).
      res.json({});
    });

  server.listen(config.port, () => console.log('Server listening on: http://localhost:%s', config.port));
}());
