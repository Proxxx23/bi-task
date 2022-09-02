import fs from "fs";
import {resolve} from "path";
import {exec} from "child_process";

(() => {
  const files = fs.readdirSync(resolve('./migrations/sqlite'));

  files.forEach((file) => exec('node ' + resolve('./migrations/sqlite/' + file)));
})();
