// HIDE
interface Options {}
// END
type HTTPFunction = (url: string, options: Options) => Promise<Response>;
const get: HTTPFunction = (url, options) => { /* COMPRESS */ return Promise.resolve(new Response()); /* END */ };
const post: HTTPFunction = (url, options) => { /* COMPRESS */ return Promise.resolve(new Response()); /* END */ };

