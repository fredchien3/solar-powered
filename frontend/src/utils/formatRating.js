// Original
// 95 - 99% : Overwhelmingly Positive
// 80 - 94% : Very Positive
// 80 - 99% + few reviews: Positive
// 70 - 79% : Mostly Positive
// 40 - 69% : Mixed
// 20 - 39% : Mostly Negative
// 0 - 39% + few reviews: Negative
// 0 - 19% : Very Negative
// 0 - 19% + many reviews: Overwhelmingly Negative

// Few reviews
// 80 - 99% + few reviews: Positive
// 70 - 79% : Mostly Positive
// 40 - 69% : Mixed
// 0 - 39% + few reviews: Negative

export const ratingSummary = (averageScore) => {
  switch (true) {
    case averageScore === null:
      return "No user reviews";
    case averageScore >= 80:
      return "Positive";
    case averageScore >= 70:
      return "Mostly Positive";
    case averageScore >= 40:
      return "Mixed";
    case averageScore >= 0:
      return "Negative";
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
      return "main-red-thumb";
    default:
      return "Fred something went wrong";
  }
}