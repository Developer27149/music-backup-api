const test = require('ava');

const add = (a, b) => a + b;

test('simple test', (t) => {
  const c = add(1, 2);
  t.is(c, 3);
});
