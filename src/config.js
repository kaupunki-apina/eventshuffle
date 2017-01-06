
// Development / production fallback values as defaults.
export default {
  dbUri: process.env.DB_URI || 'mongodb://localhost:27017/eventshuffle',
  dateFormat: process.env.DATE_FORMAT || 'YYYY-MM-DD',
  port: process.env.PORT || 8080,
};
