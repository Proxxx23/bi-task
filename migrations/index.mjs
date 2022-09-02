import fs from "fs";
import {resolve} from "path";

(() => {
  const files = fs.readdirSync(resolve('./migrations/sqlite'));

  files.forEach((file) => fs.openSync(resolve('./migrations/sqlite/' + file)));
})();
