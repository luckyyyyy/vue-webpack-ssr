/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (root@williamchan.me)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 * @notice   : 此文件正式环境，请考虑性能问题，nodejs CPU密集型性能很弱。
 */

const fs = require('fs');
const path = require('path');
const LRU = require('lru-cache');
const express = require('express');
// const favicon = require('serve-favicon');
const { createBundleRenderer } = require('vue-server-renderer');
// const compression = require('compression');
const bundle = require('../dist/vue-ssr-server-bundle.json');
const clientManifest = require('../dist/vue-ssr-client-manifest.json');
const getContext = require('./context');

const fullPath = s => path.join(__dirname, '..', s);

const renderer = createBundleRenderer(bundle, {
  template: fs.readFileSync(fullPath('/template/ssr.html'), 'utf-8'),
  cache: new LRU({
    max: 1000,
    maxAge: 1000 * 60 * 15,
  }),
  basedir: fullPath('/dist'),
  runInNewContext: 'once',
  clientManifest,
});

const serve = (path, cache) => express.static(fullPath(path), {
  maxAge: cache && 1000 * 60 * 60 * 24 * 30,
});

const app = express();
// app.use(compression({ threshold: 0 }));
// app.use(favicon('./public/favicon.ico'));
// app.use('/dist/service-worker.js', serve('./dist/service-worker.js'));
app.use('/static', serve('/dist/static', true));
app.use('/public', serve('/public', true));
app.use('/robots.txt', serve('/public/robots.txt', true));

app.disable('x-powered-by');
app.set('trust proxy', true);

app.get('*', async (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  const context = getContext(req);
  const renderStream = renderer.renderToStream(context)
  renderStream.once('data', () => {
    if (context.httpStatus) res.status(context.httpStatus);
  })
  renderStream.on('data', (chunk) => {
    res.write(chunk);
  })
  renderStream.on('end', () => {
    res.send();
  })
  renderStream.on('error', (err) => {
    if (err.url) {
      res.redirect(err.url);
      res.send();
    } else {
      console.error(new Date());
      let log = [];
      const headers = Object.keys(req.headers).map(key => {
        return `${key}: ${req.headers[key]}`;
      });
      log.push(`Error during render: ${req.url}`)
      log.push(headers.join("\n"));
      log.push(err.stack);
      if ((process.env.PERFMA_ENV || err.statusCode === 500) && err.extra && err.extra.config && err.extra.config.headers) {
        log.push("\nError extra:");
        log.push(`${err.extra.config.method.toLocaleUpperCase()}: ${err.extra.config.url}`);
        if (err.extra.config.data) {
          log.push(err.extra.config.data);
        }
        if (err.extra.response) {
          log.push(err.extra.response.data);
        } else if (err.extra.data) {
          log.push(err.extra.data);
        }
      }
      if (typeof err.statusCode === 'number') {
        res.status(err.statusCode)
        res.write(
          `<h1>${err.message}</h1>
          <hr>`
        );
        if (process.env.PERFMA_ENV) {
          res.write(`
          <pre>${log.map((e) => {
            if (typeof e === 'string') {
              return `<div>${e}</div>`
            } else {
              return `<div>${JSON.stringify(e)}</div>`;
            }
          }).join('')}</pre>`);
        }
        res.send();
      } else {
        if (process.env.PERFMA_ENV) {
          res.status(500).send(`<h1>Internal Server Error</h1><pre>${log.join('\n')}</pre>`);
        } else {
          res.status(500).send('<h1>Internal Server Error</h1>');
        }
      }
      log.forEach((e) => console.error(e))
      console.error('\n')
    }
  });

});

const port = process.env.PORT || 12800;
const host = process.env.HOST || '127.0.0.1';
app.listen(port, host, () => {
  console.log(`> server started at ${host}:${port}\n`);
});
