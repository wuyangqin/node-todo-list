const db = require('./db.js');
const inquirer = require('inquirer')

function writeFile (list, toast = '操作') {
  db.write(list).then(
    () => { console.log(`${toast}成功`) },
    () => { console.log(`${toast}失败`) }
    )
}

module.exports.add = async (title) => {
  const list = await db.read()
  list.push({ title, done: false })
  writeFile(list,'添加')
}

module.exports.clear = () => {
  writeFile([],'清除')
}

function printTasks (list) {
  const message = list.length === 0 ? '暂无任务' : '请选择想操作的任务：'
  inquirer
    .prompt({
      type: 'list',
      name:'index',
      message,
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
        askForAction(list, index)
      } else if (index === -2) {
        askForCreateTask(list)
      }
    })
}

function askForAction (list, index) {
  const actions =  {markAsUndone, markAsDone, remove, updateTitle }
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
    }).then(answer => {
    const action = actions[answer.action]
    action && action(list, index)
  })
}

function markAsDone(list, index) {
  list[index].done = true
  writeFile(list)
}

function markAsUndone(list, index) {
  list[index].done = false
  writeFile(list)
}

function updateTitle(list, index) {
  inquirer.prompt({
    type: 'input',
    name: 'title',
    message: '新的标题',
    default: list[index].title
  }).then(answer => {
    list[index].title = answer.title
    writeFile(list,'修改')
  })
}

function remove(list, index) {
  list.splice(index, 1)
  writeFile(list,'删除')
}

function askForCreateTask (list) {
  inquirer.prompt({
    type: 'input',
    name: 'title',
    message: '请输入任务标题：'
  }).then(answer => {
    list.push({ title: answer.title, done: false })
    writeFile(list,'添加')
  })
}

module.exports.showAll = async () => {
  const list = await db.read()
  printTasks(list)
}
