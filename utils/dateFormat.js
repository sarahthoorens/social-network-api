module.exports = (timestamp) => {
   // Format date as MM/DD/YYYY
   const date = new Date(timestamp).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
   });
   
   return date;
   }