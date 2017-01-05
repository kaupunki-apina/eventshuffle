"use strict";

import config from '../config';
import mongoose from 'mongoose';
import { Event } from '../models/index'

mongoose.Promise = global.Promise;
mongoose.connect(config.dbUri);

export default EventController = {
  newEvent: (protoEvent) => {
    return 'success';
  },
};
