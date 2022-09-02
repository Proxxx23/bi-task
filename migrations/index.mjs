import fs from "fs";
import {resolve} from "path";
import {exec} from "child_process";

(() => {
  const files = fs.readdirSync(resolve('./migrations/sqlite'));

  files.forEach((file) => {
    if (process.env.NODE_ENV === 'test' && file.includes('test')) {
      exec('node ' + resolve('./migrations/sqlite/' + file));
    } else if (process.env.NODE_ENV === 'production') {
      exec('node ' + resolve('./migrations/sqlite/' + file));
    }
  });
  exec('chmod 777 ' + resolve('./migrations'));
})();
