let fs = require('fs');
let labels = [];
Array.from(JSON.parse(fs.readFileSync('./config/issuesrc.json', 'utf8')).categories).forEach((category) => {
    category.labels.forEach((label) => {
        label.name = `${category.name}: ${label.name}`;
        labels.push(label);
    });
});

module.exports = labels;
