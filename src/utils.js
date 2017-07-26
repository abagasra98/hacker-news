function timeDifference(current, previous) {
  const milliSecondsPerMinute = 60 * 1000;
  const milliSecondsPerHour = milliSecondsPerMinute * 60;
  const milliSecondsPerDay = milliSecondsPerHour * 24;
  const milliSecondsPerMonth = milliSecondsPerDay * 30;
  const milliSecondsPerYear = milliSecondsPerDay * 365;

  const elapsed = current - previous;

  if (elapsed < milliSecondsPerMinute / 3) {
    return 'just now';
  }

  if (elapsed < milliSecondsPerMinute) {
    return 'less than 1 min ago';
  } else if (elapsed < milliSecondsPerHour) {
    const duration = Math.round(elapsed / milliSecondsPerMinute);
    return (duration > 1) ? (duration + ' mins ago') : (duration + ' min ago');
  } else if (elapsed < milliSecondsPerDay) {
    const duration = Math.round(elapsed / milliSecondsPerHour);
    return (duration > 1) ? (duration + ' hrs ago') : (duration + ' hr ago');
  } else if (elapsed < milliSecondsPerMonth) {
    const duration = Math.round(elapsed / milliSecondsPerDay);
    return (duration > 1) ? (duration + ' days ago') : (duration + ' day ago');
  } else if (elapsed < milliSecondsPerYear) {
    const duration = Math.round(elapsed / milliSecondsPerMonth);
    return (duration > 1) ? (duration + ' months ago') : (duration + ' month ago');
  } else {
    const duration = Math.round(elapsed / milliSecondsPerYear);
    return (duration > 1) ? (duration + ' years ago') : (duration + ' year ago');
  }
}

export function timeDifferenceForDate(date) {
  const now = new Date().getTime();
  const updated = new Date(date).getTime();
  return timeDifference(now, updated);
}