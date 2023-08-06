import './env.mjs';
import express from 'express';
import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';
import routes from './routes.mjs';

const initServer = async () => {
  const app = express();

  app.use(express.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(
    cookieSession({
      name: 'session',
      keys: [process.env.COOKIE_SECRET],
      httpOnly: true,
      sameSite: 'strict',
    })
  );
  app.use((req, res, next) => {
    console.log(req.method.toUpperCase(), '-', req.url);
    next();
  });
  app.use(routes);

  const PORT = 8000;
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
};

initServer();
