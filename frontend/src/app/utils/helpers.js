/**
 * Returns true if the object is empty
 * @param  {Object} obj
 * @returns  {boolean}
 */
export const isEmptyObject = obj => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
};

/**
 * Converts Date type to YYYY-MM-DD format
 * @param  {Date} d
 * @returns  {string} Formatted date
 */
export const formatDate = d => {
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) {
    month = `0${month}`;
  }
  if (day.length < 2) {
    day = `0${day}`;
  }

  return [year, month, day].join('-');
};

/**
 * Given starting date and time, computes the elapsed time until now
 * @param  {string} startDate
 * @returns  {string} Elapsed time
 */
export const computeWaitingTime = startDate => {
  const today = new Date();
  const diffMs = today - new Date(`${startDate}-04:00`);
  const diffHrs = Math.floor((diffMs % 86400000) / 3600000);
  const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
  return `${diffHrs}h ${diffMins}min`;
};

/**
 * Checks if a given date is the same date as today
 * @param  {string} dateString
 * @returns  {boolean}
 */
export const isToday = dateString => {
  const today = new Date();
  const date = new Date(dateString);
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  return today - date === 0;
};

/**
 * Converts an array of objects to an object of objects
 * @param  {Array} array
 * @param  {string} keyField
 * @returns  {Object}
 */
export const arrayToObject = (array, keyField) =>
  array.reduce((obj, item) => {
    obj[item[keyField]] = item;
    return obj;
  }, {});

/**
 * Slices specific keys within an object
 * @param  {Object} obj
 * @param  {string} args
 * @returns  {Object}
 */
export const pick = (obj, ...args) => ({
  ...args.reduce((res, key) => ({ ...res, [key]: obj[key] }), {})
});

export const formatWaitingTime = time => {
  const dateTimeSplit = time.split(', ');
  const timeSplit = dateTimeSplit[1].split(':');
  return `${dateTimeSplit[0]} ${timeSplit[0]} h ${timeSplit[1]} min`;
};