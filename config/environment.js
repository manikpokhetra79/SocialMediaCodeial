const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
  interval: '1d',
  path: logDirectory,
});


const production = {
  name: 'production',
  asset_path: process.env.CODEIAL_ASSET_PATH,
  session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
  db: process.env.CODEIAL_DB,
  smtp: {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,

    //smtp cred
    auth: {
      user: process.env.CODEIAL_GMAIL_USERNAME,
      pass: process.env.CODEIAL_GMAIL_PASSWORD,
    },
  },
  google_clientID: process.env.CODEIAL_GOOGLE_CLIENT_ID,
  google_clientSecret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
  google_callbackURL: process.env.CODEIAL_GOOGLE_CALLBACK_URL,

  github_clientID: process.env.CODEIAL_GITHUB_CLIENT_ID,
  github_clientSecret: process.env.CODEIAL_GITHUB_CLIENT_SECRET,
  github_callbackURL: process.env.CODEIAL_GITHUB_CALLBACK_URL,

  jwt_secret: process.env.CODEIAL_JWT_SECRET,
  morgan: {
    mode: 'combined',
    options: { stream: accessLogStream },
  },
};

// module.exports = development;
module.exports = eval(
  process.env.CODEIAL_ENVIRONMENT === undefined
    ? development
    : eval(process.env.CODEIAL_ENVIRONMENT)
);
