const os = require('os');
const path = require('path');
const fs = require('fs');

const homedir = os.homedir(); // 获取home目录
const home = process.env.HOME || homedir; // 如果用户自己设置了HOME的环境变量
const dbPath = path.join(home,'.todo')

const db = {
  read(path = dbPath) {
    return new Promise((resolve, reject) => {
      // 'a+': Open file for reading and appending. The file is created if it does not exist.
      fs.readFile(path,{ flag: 'a+'}, (readError,data) => {
        if (readError) return reject(readError)
        let list
        try {
          list = JSON.parse(data.toString())
        } catch (e) {
          list = []
        }
        resolve(list)
      })
    })
  },
  write(list, path = dbPath) {
    return new Promise((resolve, reject) => {
      const string = JSON.stringify(list)
      fs.writeFile(path,string + '\n',(writeError)=>{
        if(writeError) return reject(writeError)
        resolve()
      })
    })
  }
}

module.exports  = db
