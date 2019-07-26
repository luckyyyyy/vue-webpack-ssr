/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : William Chan (root@williamchan.me)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */
process.env.NODE_ENV = 'development';

const fs = require('fs');
const os = require('os');
const path = require('path')
const opn = require('opn');
const express = require('express');
const portfinder = require('portfinder');
// const favicon = require('serve-favicon');
const { createBundleRenderer } = require('vue-server-renderer');
const webpack = require('webpack');
const MFS = require('memory-fs');
const proxyMiddleware = require('http-proxy-middleware');
const clientConfig = require('./webpack.client.conf');
const serverConfig = require('./webpack.server.conf');
const config = require('../config');
const utils = require('../utils');
const getContext = require('../../server/context');
clientConfig.mode = process.env.NODE_ENV;
serverConfig.mode = process.env.NODE_ENV;

const serverInfo =
  `express/${require('express/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`;

const readFile = (fs, file) => {
  try {
    return fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8')
  } catch (e) {}
}

console.warn('> compile, please wait.\n');

const app = express();
// app.use(favicon('./public/favicon.ico'));
app.use('/public', express.static(utils.fullPath('./public')));
app.use('/robots.txt', express.static(utils.fullPath('/public/robots.txt')));
app.set('trust proxy', 'loopback');

let renderer;
const cb = (bundle, options) => {
  renderer = createBundleRenderer(bundle, Object.assign(options, {
    template: fs.readFileSync(utils.fullPath('/template/ssr.html'), 'utf-8'),
    basedir: utils.fullPath('/dist'),
    runInNewContext: 'once',
  }));
}

let bundle, clientManifest
let resolve
const readyPromise = new Promise(r => { resolve = r })
const ready = (...args) => {
  resolve()
  cb(...args)
}
readyPromise.then(() => {
  portfinder.basePort = 8080;
  portfinder.getPort((err, port) => {
    app.listen(port, () => {
      function getLocalIps(flagIpv6) {
        const ifaces = os.networkInterfaces();
        const ips = [];
        const func = function (details) {
          if (!flagIpv6 && details.family === 'IPv6') {
            return;
          }
          ips.push(details.address);
        };
        for (const dev in ifaces) {
          ifaces[dev].forEach(func);
        }
        return ips;
      }
      const ips = getLocalIps();
      ips.unshift('localhost');
      ips.forEach((ip) => {
        console.log(`> Listening at http://${ip}:${port}`);
      });
      console.log('')
      if (config.autoOpenBrowser) {
        opn(`http://localhost:${port}`)
      }
    });
  });
});

// modify client config to work with hot middleware
clientConfig.entry = [clientConfig.entry, 'webpack-hot-middleware/client']

// dev middleware
const clientCompiler = webpack(clientConfig)
const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
  publicPath: clientConfig.output.publicPath,
  stats: false,
  logLevel: 'silent',
  serverSideRender: true,
})
app.use(devMiddleware)

clientCompiler.hooks.done.tap('complete', stats => {
  stats = stats.toJson()
  stats.errors.forEach(err => console.error(err))
  stats.warnings.forEach(err => console.warn(err))
  if (stats.errors.length) return
  clientManifest = JSON.parse(readFile(
    devMiddleware.fileSystem,
    'vue-ssr-client-manifest.json'
  ))
  if (bundle) {
    ready(bundle, {
      clientManifest
    })
  }
})

// hot middleware
app.use(require('webpack-hot-middleware')(clientCompiler, {
  heartbeat: 1000,
  log: false,
  reload: true,
}))

// proxy api requests
Object.keys(config.proxy).forEach((context) => {
  let options = config.proxy[context];
  if (typeof options === 'string') {
    options = { target: options };
  }
  app.use(proxyMiddleware(options.filter || context, options));
});

// watch and update server renderer
const serverCompiler = webpack(serverConfig)
const mfs = new MFS()
serverCompiler.outputFileSystem = mfs
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  if (stats.errors.length) return
  // read bundle generated by vue-ssr-webpack-plugin
  bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'))
  if (clientManifest) {
    ready(bundle, {
      clientManifest
    })
  }
})

app.get('*', (req, res) => {
  readyPromise.then(() => {
    const s = Date.now();
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Server', serverInfo);
    const context = getContext(req);
    renderer.renderToString(context, (err, html) => {
      if (err) {
        if (err.url) {
          res.redirect(err.url);
          res.end();
        } else if (err.code === 404) {
          res.status(404).send('404 | Page Not Found');
        } else {
          // Render Error Page or Redirect
          res.status(500).send('500 | Internal Server Error');
          console.error(`error during render : ${req.url}`);
          console.error(err.stack);
        }
      } else {
        if (context.httpStatus) res.status(context.httpStatus);
        res.send(html);
        console.log(`whole request: ${Date.now() - s}ms \t${req.url}`);
      }
    });
  }).catch((err) => {
    res.end();
  });
});
