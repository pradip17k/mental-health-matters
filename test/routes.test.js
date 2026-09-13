const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const app = require('../app');
let server;
let base;
before(async () => {
  server = await new Promise(resolve => { const instance = app.listen(0, '127.0.0.1', () => resolve(instance)); });
  base = `http://127.0.0.1:${server.address().port}`;
});
after(() => new Promise(resolve => server.close(resolve)));
for (const [route, expected] of [['/', 'How are you feeling today?'], ['/about', 'Mental health is part of everyday life.'], ['/contact', 'Find someone to talk to.']]) {
  test(`${route} renders meaningful content and shared navigation`, async () => {
    const response = await fetch(base + route);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.ok(html.includes(expected));
    assert.ok(html.includes('Skip to content'));
    assert.ok(html.includes('/js/app.js'));
  });
}
test('missing pages return a helpful 404', async () => {
  const response = await fetch(base + '/missing-page');
  assert.equal(response.status, 404);
  assert.ok((await response.text()).includes('Back to home'));
});
test('local assets are served', async () => {
  for (const asset of ['/css/styles.css', '/js/app.js', '/js/theme.js', '/favicon.svg']) {
    const response = await fetch(base + asset);
    assert.equal(response.status, 200);
    assert.ok((await response.text()).length > 0);
  }
});
