

import mongoose from 'mongoose';
import dateUtil from '../utils/dateUtil';

const BallotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  votes: {
    type: [Date],
    requred: true,
    get: dateUtil.formatDateArray,
  },
});

const Ballot = mongoose.model('Ballot', BallotSchema);


export default Ballot;
