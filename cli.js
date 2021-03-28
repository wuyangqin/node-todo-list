const { Command } = require('commander');
const program = new Command();
const api = require('./index.js');

program
  .option('-x, --xxx', 'this is an x')

program
  .command('add')
  .description('add a task')
  .action(async (...args) => {
    const title = args.slice(0,-1).join(' ')
    await api.add(title)
  });

program
  .command('clear')
  .description('clear all tasks')
  .action(async () => {
    await api.clear()
  });


program.parse(process.argv)
if (process.argv.length === 2) {
  void api.showAll()
}
