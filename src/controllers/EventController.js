
import mongoose from 'mongoose';
import config from '../config';
import Event from '../models/Event';
import Vote from '../models/Vote';

mongoose.Promise = global.Promise;
mongoose.connect(config.dbUri);


const EventController = {
  createEvent: data => new Promise((resolve, reject) => {
    new Event(data).save().then((event) => {
      resolve(resolve({ id: event.id }));
    }).catch((error) => {
      reject(error);
    });
  }),

  getEvents: () => new Promise((resolve, reject) => {
    // eslint-disable-line array-callback-return
    Event.find({ /* Whole data set */ }, { id: 1, name: 1 }, (error, events) => {
      if (!error) {
        resolve(events);
      } else {
        reject(error);
      }
    });
  }),

  getEvent: id => new Promise((resolve, reject) => {
    Event.findOne({ _id: id }, { id: 1, name: 1, dates: 1, votes: 1 }, (error, event) => {
      if (!error) {
        resolve(event);
      } else {
        reject(error);
      }
    });
  }),

  voteOnEvent: (id, data) => new Promise((resolve, reject) => {
    Event.findOne({ _id: id }, { id: 1, name: 1, dates: 1, votes: 1 }, (error, event) => {
      if (!error) {
        event.vote(new Vote(data)).then(() =>
          event.save(),
        ).then(() =>
          resolve(event),
        ).catch((voteError) => {
          reject(voteError);
        });
      } else {
        reject(error);
      }
    });
  }),

  getEventResults: id => new Promise((resolve, reject) => {
    resolve({});
  }),
};

export default EventController;
