import express from 'express';
import InfernoServer from 'inferno-server';
import App from 'pages/App';
import path from 'path';
import Html from 'stubComponents/Html.jsx';
import assets from './assets.json'; // eslint-disable-line import/no-unresolved
import config from './config.json'; // eslint-disable-line import/no-unresolved

const app = express();
const pageCache = new Map();
//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  if (req.url) {
    if (pageCache.has(req.url)) {
      return res.status(200)
      .send(pageCache.get(req.url));
    }
    try {
      const css = new Set();

      const context = {
        insertCss: (...styles) => {
          // eslint-disable-next-line no-underscore-dangle
          styles.forEach(style => css.add(style._getCss()));
        },
        redirect: res.redirect.bind(res),
      };

      const data = {};

      data.children = InfernoServer.renderToString(<App context={ context }/>);

      data.styles = [
        { id: 'css', cssText: [...css].join('') },
      ];

      data.scripts = [
        assets.vendor.js,
        assets.main.js,
      ];

      const html = `<!doctype html>${InfernoServer.renderToString(<Html { ...data } />)}`;

      pageCache.set(req.url, html);

      res.status(200)
      .send(html);
    } catch (err) {
      next(err);
    }
  }
});

//
// Launch the server
// -----------------------------------------------------------------------------

app.listen(parseInt(config.port), config.host, () => console.info(config.serverWasRunDetectString));
