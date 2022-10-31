import { useState } from 'react';
import './StoreTabList.css';
import TabListInfo from './TabListInfo';
import TabListItem from './TablistItem';

export default function StoreTabList({ games }) {
  const [index, setIndex] = useState(0);
  
  const tabListItems = [];
  const tabFullInfoPanels = [];
  
  const handleMouseEnter = (e) => {
    setIndex(parseInt(e.currentTarget.id));
  }
  
  if (games.length > 0) {
    for (let i = 0; i < 10; i++) {
      const game = games[i];
      tabListItems.push(
        <div onMouseEnter={handleMouseEnter} id={i} key={game.id}>
          <TabListItem
            game={game}
            active={index === i} 
          />
        </div>
      );
      tabFullInfoPanels.push(
        <TabListInfo 
          game={game} 
          key={game.id} 
          active={index === i} 
        />
      );
    }
  }
  return (
    <div className="store-tab-list-wide-wrapper">
      <div className="store-tab-list">
        <div className="store-tab-list-left-col">
          <div className="tab-list-see-more-wrapper">See more</div>
          {tabListItems}
        </div>
        <div className="store-tab-list-right-col">
          {tabFullInfoPanels}
        </div>
      </div>
    </div>
  )
}