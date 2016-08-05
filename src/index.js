import express from 'express'
import cors from 'cors'

const app = express();
const delegate = (res, callback) => {
  return callback(null, { origin: true });
};

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.all('/feedly/*', cors(delegate), (req, res) => {
  const resolvedPath = req.path.substr('/feedly'.length);
  res.send(`catch feedly request path=${resolvedPath}`);
});

const server = app.listen(3000, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Application listening at http://%s:%s', host, port);
});
