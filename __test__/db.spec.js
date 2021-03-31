const db = require('../db.js');
const fs = require('fs');
jest.mock('fs') // jest将fs接管

describe('db', () => {
  afterEach(()=>{
    fs.clearMocks()
  })
  
  it ('can read', async () => {
    const data = [{title: 'hi', done: false}]
    fs.setReadFileMock('/test',null, JSON.stringify(data))
    const list = await db.read('/test')
    expect(list).toStrictEqual(data)
  })
  
  it ('can write', async () => {
    let fakeFile
    fs.setWriteFileMock('/test1', (path, data, callback) => {
      fakeFile = data
      callback(null)
    })
    const list = [{title: 'hi', done: false}]
    await db.write(list,'/test1')
    expect(fakeFile).toBe(JSON.stringify(list) + '\n')
  })
})
