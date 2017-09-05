
const repoUrl = require('./tasks/repo-url')
const fs = require('fs');

if (!__dirname.match(/.*node_modules.*/)) {
  repoUrl.validate();
  const fname = 'code-of-conduct.md'
  const conduct = fs.readFileSync(fname, 'utf8');
  if (conduct.match(/\[REPLACE EMAIL\]/)) {
    console.log(
      chalk.red.bold(
        `ERROR: Please '[REPLACE EMAIL]' in ${fname}`
      )
    );
    process.exit(-1);
  }
}

