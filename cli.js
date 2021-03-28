const { Command } = require('commander');
const program = new Command();
// program.version('0.0.1')
const api = require('./index.js');

program
  .option('-x, --xxx', 'this is an x')

program
  .command('add')
  .description('add a task')
  .action((...args) => {
    const title = args.slice(0,-1).join(' ')
    api.add(title)
    // console.log('add tasks')
  });

program.parse(process.argv)
