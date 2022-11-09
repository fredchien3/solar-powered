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

// 95 - 99% : Overhwelmingly Positive
// 94 - 80% : Very Positive
// 80 - 99% + few reviews: Positive
// 70 - 79% : Mostly Positive
// 40 - 69% : Mixed
// 20? - 39% : Mostly Negative
// 0 - 39% + few reviews: Negative
// 0 - 19% : Very Negative
// 0 - 19% + many reviews: Overwhelmingly Negative