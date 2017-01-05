"use strict";

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

export default mongoose.model('Event', EventSchema);