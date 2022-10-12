import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { fetchGames } from "../../store/games";
import FeaturedBox from "./FeaturedBox";
import "./StoreHomePage.css"
import StoreSidebar from "./StoreSidebar";

export default function StoreHomePage() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch])

  const games = useSelector(state => Object.values(state.games))
  
  return (
    <div className="store-home-page">

      <nav className="store-top-nav">
        <StoreSidebar />
        <div className="store-top-nav-links">
          <div>Your Store</div>
          <div>New & Noteworthy</div>
          <div>Categories</div>
          <div>Points Shop</div>
          <div>News</div>
          <div>Labs</div>
        </div>
        <input type="search" />
      </nav>

      <div className="store-featured-box-wide-wrapper">
        <h1>Featured & recommended</h1>
        {/* <FeaturedBox /> */}
        <section className="store-featured-box">
          <figure>picture</figure>
          <figcaption className="featured-description-box">
            <div className="featured-title">
              <h2>Game Title</h2>
            </div>
            <div className="featured-screenshots-wrapper">
              <div className="featured-screenshot">1</div>
              <div className="featured-screenshot">2</div>
              <div className="featured-screenshot">3</div>
              <div className="featured-screenshot">4</div>
            </div>
            <div className="featured-text-wrapper">
              <h3>Now Available</h3>
              <div>Top Seller</div>
            </div>
            <div className="price-line">
              <p>Free to Play</p>
            </div>
          </figcaption>
        </section>
        <div className="carousel-nubs">hello!!</div>
      </div>

      {/* <section className="store-home-main-column"> */}
      {/* </section> */}

    </div>
    
  )
}