
import moment from 'moment';
import mongoose from 'mongoose';
import config from '../config';
import Event from '../models/event';

mongoose.Promise = global.Promise;
mongoose.connect(config.dbUri);


const validate = (request, callback) => {
  const hasValidName = (!!request.body.name && request.body.name.length > 0);
  let hasValidDates = !!request.body.dates;

  const protoEvent = {
    name: request.body.name,
    dates: [],
  };

  if (hasValidDates && hasValidName) {
    request.body.dates.map((date) => { // eslint-disable-line array-callback-return
      const formattedDate = moment(date, config.dateFormat);

      if (formattedDate.isValid) {
        protoEvent.dates.push(formattedDate.toDate());
      } else {
        hasValidDates = false;
      }
    });
  }

  return callback((hasValidName && hasValidDates), protoEvent);
};


const EventController = {
  createEvent: request => new Promise((resolve, reject) => {
    validate(request, (isValid, protoEvent) => {
      if (isValid) {
        console.log(protoEvent);
        const event = new Event(protoEvent);

        event.save((error) => {
          if (!error) {
            resolve({ id: event.id });
          } else {
            reject(error);
          }
        });
      } else {
        reject({}); // TODO Better error message
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

  getEvent: (id) => new Promise((resolve, reject) => {
    resolve({});
  }),

  voteOnEvent: (id) => new Promise((resolve, reject) => {
    resolve({});
  }),

  getEventResults: (id) => new Promise((resolve, reject) => {
    resolve({});
  }),
};

export default EventController;
