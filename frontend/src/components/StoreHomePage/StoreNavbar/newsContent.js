import { prettifyDate } from "../../../helpers";

export const newsContent = (
  <>
    <article className="news-article">
      <span>
        <h3 id="news-text">NEWS</h3>
        <h3 id="posted-text">POSTED</h3>
        <h3>{prettifyDate("11/19/2022")}</h3>
      </span>
      <h1>News Popup Added</h1>
      <p>
        Hello user! I just implemented this nifty news popup that you're looking at right now. You can click out of it to close it. You can also click on either of the two close buttons.
      </p>
      <p>
        To set up this popup modal, I used React context, React portal, and the useRef hook for the first time. It's cool because now that I have my Modal component set up, I can re-use it elsewhere in the site. I already have some use cases in mind, like popping up a confirmation when a user clicks "Remove all items" on their cart.
      </p>
      <p>
        For posterity, I'll be writing news articles for previously released updates. If you want to dive into the history of the app, keep scrolling!
      </p>
      <p>- Fred</p>
    </article>
    <article className="news-article">
      <span>
        <h3 id="news-text">NEWS</h3>
        <h3 id="posted-text">POSTED</h3>
        <h3>{prettifyDate("11/10/2022")}</h3>
      </span>
      <h1>Review Voting Added</h1>
      <p>
        Hello user, I have added the ability to vote on other users' reviews. You can vote on whether it was helpful (thumbs up), not helpful (thumbs down), or funny (smiley face). If users found a review helpful or funny, you can see the number for each vote. You won't be able to vote on your own review, as the interaction buttons are replaced by the edit and delete buttons.
      </p>
      <p>
        This feature has full CRUD functionality. Voting on a review that you haven't already voted on will POST a vote to the backend. If you change your mind and select a different vote, it will simply PATCH your previous vote. If you click again on a selected vote, it will DELETE your vote. Happy voting!
      </p>
      <p>- Fred</p>
    </article>
    <article className="news-article">
      <span>
        <h3 id="news-text">NEWS</h3>
        <h3 id="posted-text">POSTED</h3>
        <h3>{prettifyDate("11/9/2022")}</h3>
      </span>
      <h1>Reviews Added!</h1>
      <p>
        Hello user! I just pushed a pretty exciting feature. You can now write reviews for any games that you own. Reviews will be displayed on the game show page for everyone to see, and on top of that, games will now dynamically calculate and display the percentage of positive reviews. 
      </p>
      <p>
        Currently, the summary text is set to "Positive", "Mostly Positive", "Mixed", and "Negative", of course depending on how many users recommend the game versus how many do not recommend it. This review score summary is shown on each game's individual show page as well as the store home page when you hover over a game!
      </p>
      <p>
        Go ahead and try writing a review for your favorite game! Don't forget to select a thumbs up or thumbs down to represent whether or not you recommend the game to other users. If you change your mind, you can always edit or delete your review.
      </p>
      <p>Until the next!</p>
      <p>- Fred</p>
    </article>
  </>
)