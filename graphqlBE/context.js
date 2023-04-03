const users = require("./db/users.json");
const wands = require("./db/wands.json");
const characters = require("./db/harrypotter.json");

const context = { wands, characters, users };

module.exports = context;