const test = require('ava');
const superkoa = require('superkoa');
const app = require('../src/app');

test('/1/name api test', async (t) => {
  const res = await superkoa(app).get('/1/name');
  t.is(200, res.status);
  t.is('aaron', res.body.name);
});
