import express from 'express'
import cors from 'cors'
import request from 'superagent'

const app = express();
const delegate = (res, callback) => {
  return callback(null, { origin: true });
};
const createQuery = (params) => {
  return Object.keys(params).reduce((prev, current) => {
    return `${prev}&${current}=${encodeURIComponent(params[current])}`;
  }, '').substr(1);
};
const exec = (url, req, res) => {
  request.get(url).end((error, data) => {
    console.log(data.header['content-type']);
    res.status = data.status;
    res.set('Content-Type', data.header['content-type']);
    res.send(data.text);
  });
};

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/http/*', cors(delegate), (req, res) => {
  const url = `http://${req.params[0]}?${createQuery(req.query)}`;
  exec(url, req, res);
})

app.get('/https/*', cors(delegate), (req, res) => {
  const url = `http://${req.params[0]}?${createQuery(req.query)}`;
  exec(url, req, res);
})

const feedlyBaseUrl = 'https://cloud.feedly.com/v3';
app.get('/feedly/*', cors(delegate), (req, res) => {
  const url = `${feedlyBaseUrl}/${req.params[0]}?${createQuery(req.query)}`;
  exec(url, req, res);
});

const server = app.listen(3000, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Application listening at http://%s:%s', host, port);
});
