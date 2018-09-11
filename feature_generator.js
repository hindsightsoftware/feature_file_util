const fs = require('fs')
const sh = require("shelljs")
const createFeatures = (number, dir) => {
  const currentDir = sh.pwd().stdout
  if (!fs.existsSync(currentDir + "/" + dir)){
    fs.mkdirSync(currentDir + "/" + dir);
  }
  
  for (let i = 1; i <= number; i++) {
    const fileName = `feature_file_${i}.feature`
    let fileString = ''
    for (let i = 0; i <= getRandomInt(8, 20); i++) {
      const featureTitleString = `Feature: ${generateRandomString()}`
      const descriptionString = `\tA ${generateRandomString()}`
      const tagString = `\t${generateTags()}`
      let scenarios = []
      for (let i = 0; i <= getRandomInt(3, 50); i++) {
        let string = `\tScenario: ${generateRandomString()}`
        const gWT = generateGivenWhenThen()
        for (let line of gWT) {
          string += `\n \t \t${line}`
        }
        scenarios.push(string)
      }
      let featureString = `${featureTitleString}\n${descriptionString}\n${tagString}`
      for (let scenario of scenarios) {
        featureString += `\n${scenario}`
      }
      fileString += featureString + '\n'
    }
    fs.appendFile(`${dir}/${fileName}`, fileString, (err) => {  
      if (err) throw err;
        console.log('Feature file saved!');
  });

  }
}
const generateGivenWhenThen = () => {
  let lines = []
  lines.push(`Given ${generateRandomString()}`)
  for (let i = 0; i <= getRandomInt(1,5); i++) {
    lines.push(`And ${generateRandomString()}`)
  }
  lines.push(`When ${generateRandomString()}`)
  for (let i = 0; i <= getRandomInt(1,5); i++) {
    lines.push(`And ${generateRandomString()}`)
  }
  lines.push(`Then ${generateRandomString()}`)
  for (let i = 0; i <= getRandomInt(1,5); i++) {
    lines.push(`And ${generateRandomString()}`)
  }
  return lines
}
const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return (Math.floor(Math.random() * (max - min)) + min)
}
const generateRandomString = () => {
  const vocabulary = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',0,1,2,3,4,5,6,7,8,9]
  let string = ''
  for (let i = 0; i <= getRandomInt(20, 50); i++) {
    string += vocabulary[getRandomInt(0, vocabulary.length)]
  }
  return string
}
const generateTags = () => {
  let tagString = ''
  for (let i = 0; i <= getRandomInt(1,5); i++) {
    tagString += `@${generateRandomString()} `
  }
  return tagString
}

exports.generate = (number, dir) => {
  createFeatures(number, dir)
}
