
import moment from 'moment';
import mongoose from 'mongoose';
import config from '../config';


const formatDate = date => (date ? moment(date).format(config.dateFormat) : null);
const formatDateArray = dates => (dates ? dates.map(date => formatDate(date)) : null);

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dates: {
    type: [Date],
    required: true,
    get: formatDateArray,
  },
  votes: [{
    date: {
      type: Date,
      get: formatDate,
    },
    people: [String],
  }],
}, {
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;                       // eslint-disable-line
      delete ret._id;                         // eslint-disable-line
      if (!!doc.dates) ret.dates = doc.dates; // eslint-disable-line
      if (!!doc.votes) ret.votes = doc.votes; // eslint-disable-line
    },
  },
});


const Event = mongoose.model('Event', EventSchema);


export default Event;
