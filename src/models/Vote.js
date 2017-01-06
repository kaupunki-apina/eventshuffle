

import mongoose from 'mongoose';
import dateUtil from '../utils/dateUtil';

const VoteSchema = new mongoose.Schema({
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

const Vote = mongoose.model('Vote', VoteSchema);


export default Vote;
