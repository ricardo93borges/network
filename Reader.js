const read = (filepath) => {
    var fs = require('fs'); 
    var contents = fs.readFileSync(filepath, 'utf8');
    return contents
}

module.exports = read