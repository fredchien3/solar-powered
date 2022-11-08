export const prettifyDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone:'utc'
  })
}

export const numberifyDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-us', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    timeZone:'utc'
  })
}

export const longDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone:'utc'
  })
}