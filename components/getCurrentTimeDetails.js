function getCurrentTimeDetails() {
   const now = new Date();
 
   // Get current hour and minutes
   const hour = now.getHours();
   const minutes = now.getMinutes();
   const Hour = hour % 12 || 12; // Convert 24-hour format to 12-hour format and handle midnight
 
   // Get AM or PM
   const dayPeriod = hour >= 12 ? 'PM' : 'AM';
 
   // Get day of the week
   const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
   const weekDay = weekDays[now.getDay()];
 
   // Get number of the week
   const weekNumber = now.getDate();
 
   // Return an object with all details
   return { Hour, minutes, weekDay, weekNumber, dayPeriod };
 }

 export default getCurrentTimeDetails;

 