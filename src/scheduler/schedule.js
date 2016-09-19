const SCHEDULER = process.env.CONF_ALGO_SCHEDULER || 'optimal';
module.exports = require(`./schedule-${SCHEDULER}`);