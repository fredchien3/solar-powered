import { prettifyDate } from "../../../helpers";

export const newsContent = (
  <>
    <article className="news-article">
      <span>
        <h3 id="news-text">NEWS</h3>
        <h3 id="posted-text">POSTED</h3>
        <h3>{prettifyDate("11/19/2022")}</h3>
      </span>
      <h1>Solar News Popup Added</h1>
      <p>
        Hello user! I just implemented this nifty news popup. You can click out of it to close it. You can also click on either of the two close buttons.
      </p>
      <p>
        To set up this popup modal, I used React context, React portal, and the useRef hook for the first time. It's cool because now that I have my Modal component set up, I can re-use it elsewhere in the site. I already have some use cases in mind, like popping up a confirmation when a user clicks "Remove all items" on their cart.
      </p>
      <p>
        For posterity, I'll be writing news articles for previously released updates. If you want to dive into the history of the app, keep scrolling!
      </p>
    </article>
    <article className="news-article">
      <span>
        <h3 id="news-text">NEWS</h3>
        <h3 id="posted-text">POSTED</h3>
        <h3>{prettifyDate("11/19/2022")}</h3>
      </span>
      <h1>Lorem Ipsum</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ante massa, varius eu ante quis, hendrerit eleifend ligula. Suspendisse mauris mi, auctor et laoreet in, scelerisque quis enim. Cras elementum elementum vestibulum. Donec commodo quam nec libero vestibulum venenatis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur accumsan arcu non fermentum viverra. Duis ut turpis feugiat, elementum libero sed, bibendum lectus. Curabitur euismod feugiat lacus. Donec non libero mattis, vehicula diam et, suscipit nunc. Nulla bibendum in sapien non consectetur. Mauris gravida scelerisque sem, in ullamcorper nulla cursus vel. Cras ac arcu quis metus suscipit ultrices. Vivamus congue urna et rhoncus tempor. Sed dictum eleifend ex nec ultrices. Nulla rutrum non quam at ornare.
      </p>
    </article>
    <article className="news-article">
      <span>
        <h3 id="news-text">NEWS</h3>
        <h3 id="posted-text">POSTED</h3>
        <h3>{prettifyDate("11/19/2022")}</h3>
      </span>
      <h1>Lorem Ipsum</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ante massa, varius eu ante quis, hendrerit eleifend ligula. Suspendisse mauris mi, auctor et laoreet in, scelerisque quis enim. Cras elementum elementum vestibulum. Donec commodo quam nec libero vestibulum venenatis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur accumsan arcu non fermentum viverra. Duis ut turpis feugiat, elementum libero sed, bibendum lectus. Curabitur euismod feugiat lacus. Donec non libero mattis, vehicula diam et, suscipit nunc. Nulla bibendum in sapien non consectetur. Mauris gravida scelerisque sem, in ullamcorper nulla cursus vel. Cras ac arcu quis metus suscipit ultrices. Vivamus congue urna et rhoncus tempor. Sed dictum eleifend ex nec ultrices. Nulla rutrum non quam at ornare.
      </p>
    </article>
  </>
)