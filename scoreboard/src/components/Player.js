import React, { memo } from "react";
import PropTypes from 'prop-types';

import Counter from "./Counter";

const Player = ({ name, score, id, removePlayer, changeScore }) => {
  return (
    <div className="player">
      <span className="player-name">
        <button className="remove-player" onClick={() => removePlayer(id)}>✖</button>
        {name}
      </span>

      <Counter
        score={score}
        id={id}
        changeScore={changeScore}
      />
    </div>
  );
}

Player.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  removePlayer: PropTypes.func.isRequired,
  changeScore: PropTypes.func.isRequired
};

const playerPropsAreEqual = (prevProps, nextProps) => {
  return prevProps.score === nextProps.score;
}

export default memo(Player, playerPropsAreEqual);