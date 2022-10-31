import './TabListInfo.css';

export default function TabListInfo({ game, active }) {
  const images = [];
  for (let i = 0; i < 4; i++) {
    const url = game.imageUrls[i];
    images.push(<img src={url} alt={game.title + ' panel ' + (i + 1)} key={url} />);
  }
  return (
    <div className={active ? "tab-list-info tab-active" : "tab-list-info "}>
      <h1>{game.title}</h1>
      <div className="tab-list-info-user-reviews">
        Overall user reviews:
        <span>No user reviews</span>
        {/* user tags row */}
      </div>
      {images}
    </div>
  )
}