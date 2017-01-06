
import mongoose from 'mongoose';
import dateUtil from '../utils/dateUtil';

// Internal schema used for nested objects.
const EventVoteSchema = new mongoose.Schema({
  _id: {
    id: false,
  },
  date: {
    type: Date,
    get: dateUtil.formatDate,
  },
  people: {
    type: [String],
    default: [],
  },
}, {
  toJSON: {
    /*eslint-disable */
    transform: (doc, ret) => {
      ret.date = doc.date;
    },
  },
  /*eslint-enable */
});


const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dates: {
    type: [Date],
    required: true,
    get: dateUtil.formatDateArray,
  },
  votes: {
    type: [EventVoteSchema],
    default: [],
  },
}, {
  toJSON: {
    /*eslint-disable */
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      if (!!doc.dates) ret.dates = doc.dates; 
    },
    /*eslint-enable */
  },
});

EventSchema.methods.vote = (vote) => {
  const event = this;

  return new Promise((resolve) => {
    resolve(event);
  });
};

const Event = mongoose.model('Event', EventSchema);


export default Event;
