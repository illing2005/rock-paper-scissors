import { useContext, useState } from "react";
import Button from "react-bootstrap/cjs/Button";
import { START_NEW_GAME, LOAD_GAME, store } from "../../store.js";
import Modal from "react-bootstrap/Modal";
import Stack from "react-bootstrap/cjs/Stack";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";

const INITIAL_STATE = 1;
const SELECT_PLAYERS = 2;

/* Menu Component to start new game, load, and save

 */
function MenuModal({ showDialog, closeDialog }) {
  const [menuState, setMenuState] = useState(INITIAL_STATE);
  const [playerOne, setPlayerOne] = useState("");
  const [playerTwo, setPlayerTwo] = useState("");
  const { state, dispatch } = useContext(store);

  // Save complete game state in localstorage
  const saveGame = () => {
    window.localStorage.setItem("game", JSON.stringify(state));
    closeDialog();
  };

  // Get game state from localStorage
  const loadGame = () => {
    const loadedState = JSON.parse(window.localStorage.getItem("game"));
    dispatch({ type: LOAD_GAME, payload: loadedState });
    closeDialog();
  };

  const startNewGame = () => {
    dispatch({ type: START_NEW_GAME, payload: { playerTwo, playerOne } });
    setMenuState(INITIAL_STATE);
    closeDialog();
  };

  return (
    <Modal show={showDialog} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Menu</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {menuState === INITIAL_STATE && (
          <Stack gap={2} className="col-md-5 mx-auto">
            <Button
              variant="outline-secondary"
              onClick={() => setMenuState(SELECT_PLAYERS)}
            >
              Start New Game
            </Button>
            <Button onClick={loadGame} variant="outline-secondary">
              Load Game
            </Button>
            <Button onClick={saveGame} variant="outline-secondary">
              Save Game
            </Button>
          </Stack>
        )}

        {menuState === SELECT_PLAYERS && (
          <div>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Select name of Player 1"
                value={playerOne}
                onChange={(e) => setPlayerOne(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Select name of Player 2"
                value={playerTwo}
                onChange={(e) => setPlayerTwo(e.target.value)}
              />
            </InputGroup>
            <p>
              Note: If you leave Player 2 name empty it will be played by the
              computer
            </p>
            <Button variant="primary" onClick={startNewGame}>
              Start New Game
            </Button>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default MenuModal;
