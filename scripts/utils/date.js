export function getFormattedDateTime() {
  const date = new Date();

  let formattedTime = new Intl.DateTimeFormat('en-PH', { 
    month: 'long',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    hourCycle: 'h12',
  }).format(date);

  return formattedTime;
}