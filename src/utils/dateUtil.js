
import moment from 'moment';
import config from '../config';

const dateUtil = {
  formatDate: date => (date ? moment(date).format(config.dateFormat) : null),
  formatDateArray: dates => (dates ? dates.map(date => dateUtil.formatDate(date)) : null),
  sameDay: (date1, date2) => moment(date1).isSame(date2, 'day'),
};

export default dateUtil;
