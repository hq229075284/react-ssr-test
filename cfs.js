
const fs = require('fs')
const path = require('path')

function getStat(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) {
        resolve(false);
      } else {
        resolve(stats);
      }
    })
  })
}

function mkdir(dir) {
  return new Promise((resolve, reject) => {
    fs.mkdir(dir, err => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    })
  })
}

async function dirExist(dir) {
  let isExists = await getStat(dir);
  //如果该路径且不是文件，返回true
  if (isExists) {
    return isExists.isDirectory()
  }
  //如果该路径不存在
  let tempDir = path.parse(dir).dir;      //拿到上级路径
  //递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在
  let status = await dirExist(tempDir);
  let mkdirStatus;
  if (status) {
    mkdirStatus = await mkdir(dir);
  }
  return mkdirStatus
}

async function writeFile(filePath, data) {
  await (dirExist(path.parse(filePath).dir))
  await new Promise(async function (resolve, reject) {
    fs.writeFile(filePath, data, (err) => {
      if (err) { throw err }
      else { resolve() }
    })
  })
}

module.exports = {
  writeFile,
  getStat,
  dirExist,
  mkdir,
}