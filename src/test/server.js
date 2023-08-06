import { setupServer } from 'msw/node';
import { rest } from 'msw';

export function createServer(handlerConfig) {
  const handlers = handlerConfig.map((config) => {
    return rest[config.method || 'get'](
      config.path,
      (req, res, ctx) => {
        const response = config.response(req, res, ctx);

        return res(ctx.json(response));
      }
    );
  });

  const server = setupServer(...handlers);

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });
}
