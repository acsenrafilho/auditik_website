import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ cacheDir: '/home/antonio/Projects/acsenrafilho/auditik_website/.tina/__generated__/.cache/1775915065759', url: 'http://localhost:4001/graphql', token: '', queries,  });
export default client;
  