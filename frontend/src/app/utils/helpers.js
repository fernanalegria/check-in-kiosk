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
  var diffMs = today - new Date(startDate);
  var diffHrs = Math.floor((diffMs % 86400000) / 3600000);
  var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
  return `${diffHrs}h ${diffMins}min`;
};
