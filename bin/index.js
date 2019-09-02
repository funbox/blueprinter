const argsParser = require('yargs');
const { renderAndBuild } = require('./main');
const { renderAndServe } = require('./live');

argsParser
  .usage('Usage: $0 [options] -i infile [-o outfile -s]')
  .example('$0 -i example.apib -o output.html', 'Render to HTML')
  .example('$0 -i example.apib -s', 'Start live server')
  .options('i', { alias: 'input', describe: 'Input file' })
  .options('o', { alias: 'output', describe: 'Output file' })
  .options('s', { alias: 'server', describe: 'Start a local live preview server' })
  .options('h', { alias: 'host', describe: 'Address to bind local preview server to', default: '127.0.0.1' })
  .options('p', { alias: 'port', describe: 'Port for local preview server', default: 3001 });

const argv = argsParser.argv;

const exit = (err) => {
  if (err) {
    console.log(err.message);
    process.exit(1);
  }
  process.exit();
};

const argvError = () => {
  console.log('Invalid arguments');
  argsParser.showHelp();
  process.exit(1);
};

if (argv.s) {
  if (!argv.i) argvError();

  renderAndServe(argv.i, argv.p, argv.h)
    .catch(error => exit(error));
} else {
  if (!argv.i || !argv.o) argvError();

  renderAndBuild(argv.i, argv.o)
    .then(() => exit())
    .catch(error => exit(error));
}
