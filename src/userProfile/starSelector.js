import React from "react";

const StarBar = props => {

  const starObject = () => {
    let numberOfStars = 5;
    let arrayOfStars = [];

    for (let i = 0; i < numberOfStars; i++) {
      arrayOfStars.push(false);
    }
    return arrayOfStars;
  };

  const fillStarByClick = amountToFill => {
    const updateData = starObject();
    for (let i = 0; i <= amountToFill - 1; i++) {
      updateData[i] = true;
    }
    return updateData;
  };

  const handleStarsDisplay = filledAmount => {
    let currentData = fillStarByClick(filledAmount);
    return currentData.map((filled, index) => {
      return (
        <li
          key={`${index}${filled}${Math.random()}`}
          className={filled ? `starFilled` : ""}>
          <a
            href={`starFilled${index}`}
            className="anchorStar"
            onClick={e => {
              e.preventDefault();
              props.skillValue(index + 1);
            }}>
            <i className="fas fa-star is-size-4 starColor"></i>
          </a>
        </li>
      );
    });
  };

  return (
    <div className="skillStarBar is-flexed is-marginless">
      <ul className="starsList">{handleStarsDisplay(props.level)}</ul>
    </div>
  );
};

export default StarBar;
