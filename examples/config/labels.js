let config = require('./config');
let labels = [];

Array.from(config.categories).forEach((category) => {
    category.labels.forEach((label) => {
        label.name = `TEST ${category.name}: ${label.name}`;
        labels.push(label);
    });
});

module.exports = labels;
