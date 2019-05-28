

const read = (filepath) => {
    var fs = require('fs'); 
    var contents = fs.readFileSync(filepath, 'utf8');
    return contents
}

const write = (content) => {
    var fs = require('fs');
    const uuidv4 = require('uuid/v4');
    let filename = `${uuidv4()}.txt`;
    fs.writeFileSync(`./${filename}`, content);    
}

module.exports = {read, write}