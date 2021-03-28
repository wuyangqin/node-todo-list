const db = require('./db.js');

module.exports.add = async (title) => {
  // 读取之前的任务
  const list = await db.read()
  // 添加一个任务
  list.push({ title, done: false })
  // 将任务储存到文件
  await db.write(list)
}

module.exports.clear = async () => {
  await db.write([])
}
