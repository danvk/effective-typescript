// HIDE
namespace express {
  export interface Request {}
  export interface Response {
    send(text: string): void;
  }
}
interface App {
  get(path: string, cb: (request: express.Request, response: express.Response) => void): void;
}
const app: App = null!;
// END

// Don't do this:
app.get('/health', (request: express.Request, response: express.Response) => {
  response.send('OK');
});

// Do this:
app.get('/health', (request, response) => {
  response.send('OK');
});

