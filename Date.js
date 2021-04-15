const date = new Date();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const current_month = months[date.getMonth()];
const current_year = date.getFullYear();
const current_day = date.getDate();
export const current_date = current_day + '.' + ' ' + current_month + ' ' + current_year;
