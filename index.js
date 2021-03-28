const db = require('./db.js');
const inquirer = require('inquirer')

module.exports.add = async (title) => {
  const list = await db.read()
  list.push({ title, done: false })
  await db.write(list)
}

module.exports.clear = async () => {
  await db.write([])
}

module.exports.showAll = async () => {
  const list = await db.read()
  inquirer
    .prompt({
      type: 'list',
      name:'index',
      message:'请选择想操作的任务：',
      choices:[
        { name: '退出', value: '-1' },
        ...list.map((task,index) => {
        return {
          name: `${ task.done ? '[√]': '[_]' } ${ index + 1 }.${task.title}`,
          value: index.toString()
        }
      }),
        { name: '+ 创建任务', value: '-2' }
      ]
    })
    .then(answer => {
      const index = parseInt(answer.index)
      if (index >= 0) {
        inquirer
          .prompt({
            type: 'list',
            name:'action',
            message:'请选择操作：',
            choices:[
              {name: '退出', value: 'quit'},
              {name: '已完成', value: 'markAsDone'},
              {name: '未完成', value: 'markAsUndone'},
              {name: '改标题', value: 'updateTitle'},
              {name: '删除', value: 'remove'},
            ]
          }).then(answer1 => {
            switch (answer1.action) {
              case 'markAsDone':
                list[index].done = true
                db.write(list)
                break;
              case 'markAsUndone':
                list[index].done = false
                db.write(list)
                break;
              case 'updateTitle':
                inquirer.prompt({
                  type: 'input',
                  name: 'title',
                  message: '请输入任务新表弟：',
                  default: list[index].title
                }).then(answer2 => {
                  list[index].title = answer2.title
                  db.write(list)
                })
                break;
              case 'remove':
                list.splice(index, 1)
                db.write(list)
                break;
            }
        })
      } else if (index === -2) {
        inquirer.prompt({
          type: 'input',
          name: 'title',
          message: '请输入任务标题：'
        }).then(answer2 => {
          list.push({ title: answer2.title, done: false })
          db.write(list)
        })
      }
    })
}
