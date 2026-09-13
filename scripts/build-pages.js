const fs = require('node:fs/promises');
const path = require('node:path');
const ejs = require('ejs');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'docs');
const base = '/mental-health-matters';

async function build() {
  await fs.mkdir(output, { recursive: true });
  await fs.cp(path.join(root, 'public'), output, { recursive: true });
  for (const [view, route, destination] of [
    ['index', '/', 'index.html'],
    ['about', '/about', 'about/index.html'],
    ['contact', '/contact', 'contact/index.html'],
    ['not-found', '/404', '404.html'],
  ]) {
    const rendered = await ejs.renderFile(path.join(root, 'views', `${view}.ejs`), { currentPath: route });
    const html = rendered.replace(/(href|src)="\/(?!\/)([^"]*)"/g, (_, attribute, target) => {
      const normalized = target.replace(/^(about|contact)(?=#|$)/, '$1/');
      return `${attribute}="${base}/${normalized}"`;
    });
    const file = path.join(output, destination);
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, html);
  }
  await fs.writeFile(path.join(output, '.nojekyll'), '');
  console.log('GitHub Pages site built in docs/');
}
build().catch(error => { console.error(error); process.exitCode = 1; });
