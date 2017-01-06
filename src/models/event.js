
import mongoose from 'mongoose';
import dateUtil from '../utils/dateUtil';


const isValidDate = (voteDate, event) =>
  event.dates.some(eventDate =>
    dateUtil.sameDay(voteDate, eventDate),
  );

const addVote = (date, event, voter) => {
  const votes = event.votes.find(element => dateUtil.sameDay(element.date, date));

  if (votes === undefined) {
    event.votes.push({
      date,
      people: [voter],
    });
  } else {
    votes.people.push(voter);
  }
};

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
    /* eslint-disable */
    transform: (doc, ret) => {
      ret.date = doc.date;
    },
  },
  /* eslint-enable */
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
    /* eslint-disable */
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      if (!!doc.dates) ret.dates = doc.dates; 
    },
    /* eslint-enable */
  },
});

// Non-arrow function so that "this" may be used.
EventSchema.methods.vote = function vote(castedVote) {
  const event = this;
  return new Promise((resolve, reject) => {
    castedVote.votes.forEach((date) => {
      if (isValidDate(date, event)) addVote(date, event, castedVote.name);
    });
    resolve(event);
  });
};

const Event = mongoose.model('Event', EventSchema);


export default Event;
