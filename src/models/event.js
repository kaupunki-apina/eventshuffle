
import mongoose from 'mongoose';


const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  dates: {
    type: [Date],
    required: true,
  },
  votes: [{
    date: Date,
    people: [String],
  }],
}, {
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id; // eslint-disable-line
      delete ret._id; // eslint-disable-line
    },
  },
});


const Event = mongoose.model('Event', EventSchema);


export default Event;
