const os = require('os');
const path = require('path');
const fs = require('fs');

const homedir = os.homedir(); // 获取home目录
const home = process.env.HOME || homedir; // 如果用户自己设置了HOME的环境变量
const dbPath = path.join(home,'.todo')

module.exports.add = (title) => {
  // 'a+': Open file for reading and appending. The file is created if it does not exist.
  fs.readFile(dbPath,{ flag: 'a+'}, (error,data) => {
    // 读取之前的任务
    if (error) return
    let list = []
    try {
      list = JSON.parse(data.toString())
    } catch (e) {
      list = []
    }
    // 添加一个任务
    list.push({ title, done: false })
    // 将任务储存到文件
    const string = JSON.stringify(list)
    fs.writeFile(dbPath,string + '\n',(error1)=>{
      if(error1) return
    })
  })
}
