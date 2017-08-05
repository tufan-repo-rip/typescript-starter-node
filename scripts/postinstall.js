
const repoUrl = require('./tasks/repo-url')

if (!__dirname.match(/.*node_modules.*/)) {
  repoUrl.validate();
  console.log('\n');
  console.log(`-----------------------------------------------`);
  console.log(`  Please modify email address in ./conduct.md  `);
  console.log(`-----------------------------------------------`);
  console.log(`\n`);
}

