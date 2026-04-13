import { createServer } from 'node:http';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = Number(process.env.PORT ?? 3000);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = createServer((req, res) => {
      handle(req, res).catch((error) => {
        console.error('[server] request error:', error);
        res.statusCode = 500;
        res.end('Internal Server Error');
      });
    });

    server.listen(port, hostname, () => {
      console.log(`[server] ready on http://${hostname}:${port}`);
    });
  })
  .catch((error) => {
    console.error('[server] startup error:', error);
    process.exit(1);
  });
