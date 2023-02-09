import { client } from "./connection";

(async () => {
  client.connect();
})();

export default client;
