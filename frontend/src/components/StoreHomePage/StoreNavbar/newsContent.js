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
      <h1>REVIEWS!</h1>
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
    <article className="news-article">
      <span>
        <h3 id="news-text">NEWS</h3>
        <h3 id="posted-text">POSTED</h3>
        <h3>{prettifyDate("11/7/2022")}</h3>
      </span>
      <h1>Wishlist Feature Added</h1>
      <p>
        Hello user - just implemented a quick little wishlist feature. Well, the feature ended up being neither quick nor little.
      </p>
      <p>
        I was able to structure it really similarly to the cart feature, where a logged in user can add and delete games from the wishlist. Purchasing a game that was on your wishlist will remove it from your wishlist.
      </p>
      <p>
        I also wanted users to be able to view other users' wishlists. To that end, I made accomodations in the frontend using the same custom route logic I came up with for the library page. Just like how the library page works, when you visit '/users/:username/wishlist', the Wishlist component hits the backend with that username string, which queries the database using that username, and then returns the user. After the user data arrives there, the component can then fetch the WishlistItems associated with that user's ID.
      </p>
      <p>
        That's how it worked at first. However, this caused an with the little white wishlist button above the store navbar that tracks how many items are in your wishlist. It made it so when you visit another user's wishlist, the number in the button reflects what's in that user's wishlist! It should always only display the number of items in the currently logged in user's wishlist, which is a problem I didn't face when I implemented the cart button as you can't view other users' carts.
      </p>
      <p>
        I was able to solve it by completely restructuring the relevant Redux state and backend response, splitting the WishlistItems state into two top-level keys: currentUser and otherUser. Now when viewing another user's wishlist, the info that is fetched is stored under the otherUser key, leaving the wishlist button count unaffected.
      </p>
      <p>
        I spent a long time restructuring, refactoring, optimizing, cleaning up, and it was worth it! The feature works, the components make fewer fetches, and the Redux state receives fewer actions. Feels good man.
      </p>
      <p>Have fun!</p>
      <p>- Fred</p>
    </article>
    <article className="news-article">
      <span>
        <h3 id="news-text">NEWS</h3>
        <h3 id="posted-text">POSTED</h3>
        <h3>{prettifyDate("10/21/2022")}</h3>
      </span>
      <h1>Presentation Day!</h1>
      <p>
        Today was full stack project presentation day at App Academy! Everybody got up and gave a two minute demo on their progress, and it was awesome seeing the results of my cohort mates' hard work.
      </p>
      <p>
        I'm glad I didn't run into any bugs while I was presenting. I think taking the extra time to clean up my code and test weird scenarios to make sure everything's bug free is always worth it. Plus my last minute scramble to add more games to the database and add the long description display to the game show page was also a worthwhile time investment.
      </p>
      <p>Still a long way to go, plenty of features I want to add. Onward!</p>
      <p>- Fred</p>
    </article>
    <article className="news-article">
      <span>
        <h3 id="news-text">NEWS</h3>
        <h3 id="posted-text">POSTED</h3>
        <h3>{prettifyDate("10/20/2022")}</h3>
      </span>
      <h1>"Is This Game Relevant To You" Box Added</h1>
      <p>
        This is a little feature, but a pretty cool one nonetheless. There is now a box on the right column of the game show page that I like to call the Relevant Box. If there is no account currently logged in, the box prompts the user to log in. If there is an account logged in, the box displays information regarding whether the game is relevant to the user by drawing on data specific to the logged in account!
      </p>
      <p>
        Right now, the only component of the new relevance box is whether the displayed game is similar to other games in the current user's library. In the future, after friending is implemented, it will show that a game is relevant by looking at the current user's friends' libraries to see if their friends play it.
      </p>
      <p>The Relevant Box is a small feature with a high upfront cost, but I think it's a nice touch and it opens up opportunity for more features later on.</p>
      <p>- Fred</p>
    </article>
  </>
)