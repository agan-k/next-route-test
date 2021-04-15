export default function formatPrismicDate(date) {
   let months = ["January","February","March","April","May","June","July",
      "August", "September", "October", "November", "December"];
   let day;
   let month;
   let year = date.slice(0, 4);

   if (date.charAt(8) == '0') {
      day = date.slice(9, 10);
   }
   else {
      day = date.slice(8, 10);
   }
   
   if (date.charAt(5) == '0') {
      month = months[date.slice(6, 7) - 1];
   }
   else {
      month = months[date.slice(5, 7) -1]
   }
   return day + '. ' + month + ' ' + year;
}