import { useContext, useState } from "react";
import {
  START_NEW_ROUND,
  store,
  DRAW,
  WINNER_PLAYER_TWO,
  WINNER_PLAYER_ONE,
} from "../../store.js";

import { Alert } from "react-bootstrap";
import { Button } from "react-bootstrap/cjs";

/* Component to show results of last round

 */
function WinnerAlert() {
  const { state, dispatch } = useContext(store);
  const {
    lastWinner,
    playerOneLastChoice,
    playerTwoLastChoice,
    playerOne,
    playerTwo,
  } = state;

  const startNewRound = () => {
    dispatch({ type: START_NEW_ROUND });
  };

  let msg;
  if (lastWinner === DRAW) {
    msg = "It was a draw";
  } else if (lastWinner === WINNER_PLAYER_ONE) {
    msg = `Congrats ${playerOne}`;
  } else if (lastWinner === WINNER_PLAYER_TWO) {
    msg = `Congrats ${playerTwo || "Computer"}`;
  }
  return (
    <Alert variant="success">
      <h3>{msg}</h3>
      <br />
      {playerOne} choice: {playerOneLastChoice} <br />
      {playerTwo || "Computer"} choice: {playerTwoLastChoice} <br />
      <br />
      <Button onClick={startNewRound} variant="primary">
        New Round
      </Button>{" "}
    </Alert>
  );
}

export default WinnerAlert;
