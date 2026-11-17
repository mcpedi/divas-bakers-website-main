
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  'public'
);

const port = Number(process.env.PORT || 3000);

const types = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

createServer(async (request, response) => {
  try {
    const pathname = new URL(
      request.url || '/',
      `http://${request.headers.host || 'localhost'}`
    ).pathname;

    const relativePath = pathname === '/'
      ? 'index.html'
      : decodeURIComponent(pathname.slice(1));

    const filePath = path.resolve(root, relativePath);
    const relative = path.relative(root, filePath);

    if (
      relative.startsWith('..') ||
      path.isAbsolute(relative)
    ) {
      response.writeHead(403);
      response.end('Forbidden');
      return;
    }

    const body = await readFile(filePath);

    response.writeHead(200, {
      'Content-Type':
        types[path.extname(filePath).toLowerCase()] ||
        'application/octet-stream'
    });

    response.end(body);

  } catch {
    response.writeHead(404, {
      'Content-Type': 'text/plain; charset=utf-8'
    });

    response.end('Not found');
  }

}).listen(port, '0.0.0.0', () => {
  console.log(`Divas Bakers website running on port ${port}`);
});
