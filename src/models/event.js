
import mongoose from 'mongoose';
import dateUtil from '../utils/dateUtil';

const isValidDate = (voteDate, event) =>
  event.dates.some(eventDate =>
    dateUtil.sameDay(voteDate, eventDate),
  );


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
  votes: [{
    date: {
      type: Date,
      get: dateUtil.formatDate,
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

EventSchema.methods.vote = vote => new Promise((resolve, reject) => {
  console.log('this', this.model, 'vote', vote);
  resolve(this);
});
const Event = mongoose.model('Event', EventSchema);


export default Event;
