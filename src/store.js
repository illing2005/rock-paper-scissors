import React, { createContext, useReducer } from "react";

// Possible choices
const ROCK = "ROCK";
const PAPER = "PAPER";
const SCISSORS = "SCISSORS";

// Rounds outcomes
const DRAW = 0;
const WINNER_PLAYER_ONE = 1;
const WINNER_PLAYER_TWO = 2;

// Game actions
const START_NEW_GAME = "START_NEW_GAME";
const START_NEW_ROUND = "START_NEW_ROUND";
const SUBMIT_TURN = "SUBMIT_TURN";
const LOAD_GAME = "LOAD_GAME";

const initialState = {
  isRunning: false, //
  playerTwoScore: null, // score of player two
  playerOneScore: null, // score of player one
  playerOne: null, // name of player one
  playerTwo: null, // name of player two. If empty we assume computer player
  playerOneLastChoice: null, // store last choice of player one
  playerTwoLastChoice: null, // store last choice of player two
  playerTwoIsComputer: null, // helper variable to store if we play against an AI
  turn: null, // stores who's turn is it -> 1 or 2
  lastWinner: null, // stores the last game result 0: draw, 1: player one wins, 2: player two wins
};

const store = createContext(initialState);
const { Provider } = store;

const getComputerChoice = () => {
  const choices = [ROCK, PAPER, SCISSORS];
  return choices[Math.floor(Math.random() * choices.length)];
};

const evaluateRound = (choiceOne, choiceTwo) => {
  if (choiceOne === choiceTwo) {
    return 0; // same choice -> it's a draw
  }
  if (choiceOne === ROCK && choiceTwo === SCISSORS) {
    return 1; // player one wins
  }
  if (choiceOne === ROCK && choiceTwo === PAPER) {
    return 2; // player one wins
  }
  if (choiceOne === PAPER && choiceTwo === SCISSORS) {
    return 2; // player two wins
  }
  if (choiceOne === PAPER && choiceTwo === ROCK) {
    return 1; // player one wins
  }
  if (choiceOne === SCISSORS && choiceTwo === PAPER) {
    return 1; // player one wins
  }
  if (choiceOne === SCISSORS && choiceTwo === ROCK) {
    return 2; // player two wins
  }
};

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      // Start new game by clearint state
      case START_NEW_GAME:
        return {
          ...state,
          playerOne: action.payload.playerOne,
          playerTwo: action.payload.playerTwo,
          isRunning: true,
          turn: 1,
          playerTwoIsComputer: !action.payload.playerTwo,
          playerOneScore: 0,
          playerTwoScore: 0,
        };

      // Start a new round by resetting last round values
      case START_NEW_ROUND:
        return {
          ...state,
          isRunning: true,
          playerOneLastChoice: null,
          playerTwoLastChoice: null,
          turn: 1,
          lastWinner: null,
        };

      // Submit player's turn
      //  - store players choice
      //  - if we play against Computer or player 2 submitted choice
      //    -> evaluate game
      case SUBMIT_TURN:
        const newState = { ...state };
        if (action.payload.player === 1) {
          newState.playerOneLastChoice = action.payload.choice;
        } else {
          newState.playerTwoLastChoice = action.payload.choice;
        }
        if (
          action.payload.player === 2 ||
          (action.payload.player === 1 && state.playerTwoIsComputer)
        ) {
          // evaluate game results
          if (state.playerTwoIsComputer) {
            newState.playerTwoLastChoice = getComputerChoice();
          }
          const winner = evaluateRound(
            newState.playerOneLastChoice,
            newState.playerTwoLastChoice
          );
          if (winner === WINNER_PLAYER_ONE) {
            newState.playerOneScore += 1;
          } else if (winner === WINNER_PLAYER_TWO) {
            newState.playerTwoScore += 1;
          }
          newState.lastWinner = winner;
          newState.isRunning = false;
        } else {
          // it's player two's turn
          newState.turn = 2;
        }
        return { ...newState };

      case LOAD_GAME:
        return {
          ...action.payload,
        };

      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export {
  store,
  StateProvider,
  SUBMIT_TURN,
  START_NEW_GAME,
  START_NEW_ROUND,
  LOAD_GAME,
  ROCK,
  PAPER,
  SCISSORS,
  DRAW,
  WINNER_PLAYER_ONE,
  WINNER_PLAYER_TWO,
};
