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

// Original
// 95 - 99% : Overhwelmingly Positive
// 80 - 94% : Very Positive
// 80 - 99% + few reviews: Positive
// 70 - 79% : Mostly Positive
// 40 - 69% : Mixed
// 20 - 39% : Mostly Negative
// 0 - 39% + few reviews: Negative
// 0 - 19% : Very Negative
// 0 - 19% + many reviews: Overwhelmingly Negative

// Simplified
// 95 - 99% : Overwhelmingly Positive
// 80 - 94% : Very Positive
// 70 - 79% : Mostly Positive
// 40 - 69% : Mixed
// 20 - 39% : Mostly Negative
// 0 - 19% : Very Negative

export const ratingSummary = (averageScore) => {
  switch (true) {
    case averageScore === null:
      return "No user reviews";
    case averageScore >= 95:
      return "Overwhelmingly Positive";
    case averageScore >= 80:
      return "Very Positive";
    case averageScore >= 70:
      return "Mostly Positive";
    case averageScore >= 40:
      return "Mixed";
    case averageScore >= 20:
      return "Mostly Negative";
    case averageScore >= 0:
      return "Very Negative";
    default:
      return "Fred something went wrong";
  }
}

export const ratingColor = (averageScore) => {
  switch (true) {
    case averageScore === null:
      return "no-rating";
    case averageScore >= 70:
      return "light-blue-rating";
    case averageScore >= 40:
      return "mixed-rating";
    case averageScore >= 0:
      return "red-rating";
    default:
      return "Fred something went wrong";
  }
}