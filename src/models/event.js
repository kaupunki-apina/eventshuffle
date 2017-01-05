
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: String,
  dates: [Date],
  votes: [{
    date: Date,
    people: [String],
  }],
});

const Event = mongoose.model('Event', EventSchema);

export default Event;
