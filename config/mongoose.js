const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/codeial_db1');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Successfully Connected to Database");
});
module.exports = db;