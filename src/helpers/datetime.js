/* eslint-disable import/prefer-default-export */

/**
 * Converts a datetime string in format yyyy-mm-dd HH:mm:ss to a readable date/time format.
 *
 * @param {string} dateString The string in yyyy-mm-dd HH:mm:ss format.
 * @return {string} Returns the new date/time format.
 */
export const dateFormat = (dateString) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const date = new Date(dateString);
  const formatted = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`;
  return formatted;
};
