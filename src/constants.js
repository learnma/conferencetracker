const moment = require('moment');
const Duration = require('./models/duration');

export const MORNING_SLOT_START_TIME = moment({hour: 9});
export const MORNING_SLOT_DURATION = Duration.createSlotDuration(180);

export const LUNCH_SLOT_START_TIME = MORNING_SLOT_DURATION.addDuration(MORNING_SLOT_START_TIME);
export const LUNCH_SLOT_DURATION = Duration.createSlotDuration(60);

export const NOON_SLOT_START_TIME = LUNCH_SLOT_START_TIME.addDuration(LUNCH_SLOT_DURATION);
export const NOON_SLOT_DURATION = Duration.createSlotDuration(240);