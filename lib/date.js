export default function dateOrder(date) {
    function formatDate(inputDate) {
      const options = { year: 'numeric', month: 'short', day: '2-digit' };
      const date = new Date(inputDate)
      return date.toLocaleDateString(undefined, options)
    }
  
    const inputDateString = date
    return formatDate(inputDateString)
  }
  