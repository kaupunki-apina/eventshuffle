
import config from '../config';
import mongoose from 'mongoose';
import Event from '../models/event';

mongoose.Promise = global.Promise;
mongoose.connect(config.dbUri);

const EventController = {
  createEvent: (protoEvent) => {
    // TODO return event id
    return 'todo';
  },

  getEvents: () =>
    new Promise((resolve, reject) => {
      // eslint-disable-line array-callback-return
      Event.find({ id: 1, name: 1 }, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    }),

  getEvent: (id) =>
     // Return list of events with title and id only
    new Promise((resolve, reject) => {
      resolve({});
    }),

  voteOnEvent: (id) =>
    // Return the voted on event
    new Promise((resolve, reject) => {
      resolve({});
    }),

  getEventResults: (id) =>
    // Return the event along with the most voted on dates (and voters).
    new Promise((resolve, reject) => {
      resolve({});
    }),
};

export default EventController;
