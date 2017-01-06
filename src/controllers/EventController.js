
import mongoose from 'mongoose';
import config from '../config';
import Event from '../models/event';

mongoose.Promise = global.Promise;
mongoose.connect(config.dbUri);


const EventController = {
  createEvent: request => new Promise((resolve, reject) => {
    const event = new Event(request.body);
    event.save((error) => {
      if (!error) {
        resolve({ id: event.id });
      } else {
        reject(error);
      }
    });
  }),

  getEvents: () => new Promise((resolve, reject) => {
    // eslint-disable-line array-callback-return
    Event.find({ /* Whole data set */ }, { id: 1, name: 1 }, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  }),

  getEvent: id => new Promise((resolve, reject) => {
    Event.find({ _id: id }, { id: 1, name: 1, dates: 1, votes: 1 }, (error, result) => {
      if (!error) {
        console.log(result[0].dates);
        resolve(result);
      } else {
        reject(error);
      }
    });
  }),

  voteOnEvent: id => new Promise((resolve, reject) => {
    resolve({});
  }),

  getEventResults: id => new Promise((resolve, reject) => {
    resolve({});
  }),
};

export default EventController;
