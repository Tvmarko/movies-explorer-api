const allowedCors = [
  'https://diplomabytvmarko.nomoredomains.xyz',
  'http://diplomabytvmarko.nomoredomains.xyz',
  'https://api.diplomabytvmarko.nomoredomains.xyz',
  'http://api.diplomabytvmarko.nomoredomains.xyz',
  'https://localhost:3000',
  'http://localhost:3000',
];

module.exports = ((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;

  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
});
