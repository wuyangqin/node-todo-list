const { Command } = require('commander');
const program = new Command();
const api = require('./index.js');

program
  .option('-x, --xxx', 'this is an x')

program
  .command('add')
  .description('add a task')
  .action((...args) => {
    const title = args.slice(0,-1).join(' ')
    api.add(title).then(() => { console.log('添加成功'); }, () => { console.log('添加失败'); })
  });

program
  .command('clear')
  .description('clear all tasks')
  .action(() => {
    api.clear().then(() => { console.log('清除成功'); }, () => { console.log('清除失败'); })
  });


program.parse(process.argv)
if (process.argv.length === 2) {
  void api.showAll()
}
