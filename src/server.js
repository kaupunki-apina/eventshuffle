"use strict";

import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';

(function() {
  const PORT = process.env.PORT || 8080;
  const app = express();
  const server = http.createServer(app);
  const router = express.Router();

  
  app.use(bodyParser.json());
  app.use(router);
  

  router.route('/api/v1/event')
    .post((req, res) => {
      // Create event.
      // Return event ID
      res.json({});
    });
  
  router.route('/api/v1/event/list')
    .get((req, res) => {
      // Return list of events with title and id only
      ;
      res.json({});
    });
    
  router.route('/api/v1/event/:id')
    .get((req, res) => {
      // Return a signle event
      res.json({});
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
  
  server.listen(PORT, () => console.log("Server listening on: http://localhost:%s", PORT));
}());
