const SCHEDULER = process.env.CONF_ALGO_SCHEDULER || '2';
module.exports = require(`./schedule-${SCHEDULER}`);