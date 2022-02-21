import { useContext, useState } from "react";
import "./App.css";
import Container from "react-bootstrap/cjs/Container";
import Row from "react-bootstrap/cjs/Row";
import Col from "react-bootstrap/cjs/Col";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/cjs/ButtonGroup";
import Button from "react-bootstrap/cjs/Button";
import { store, ROCK, PAPER, SCISSORS, SUBMIT_TURN } from "../../store.js";
import MenuModal from "../MenuModal/MenuModal";
import WinnerAlert from "../WinnerAlert/WinnerAlert";

function App({}) {
  const { state, dispatch } = useContext(store);
  const [showDialog, setShowDialog] = useState(true);
  const { turn } = state;
  const playerOneTurn = turn === 1 && state.isRunning;
  const playerWtoTurn = turn === 2 && state.isRunning;

  const submitTurn = (e) => {
    const choice = e.target.value;
    dispatch({
      type: SUBMIT_TURN,
      payload: {
        choice,
        player: turn,
      },
    });
  };

  return (
    <Container>
      <Row>
        <Col className="text-center">
          <h1>Rock - Paper - Scissors</h1>
        </Col>
      </Row>

      <Row>
        <Col md={12} className="text-center">
          <Card className="mb-5 mt-2">
            <Card.Body className="header">
              <div className="">
                Score: {state.playerOneScore}:{state.playerTwoScore}
              </div>
              <div className="">
                <ButtonGroup>
                  <Button variant="primary" onClick={() => setShowDialog(true)}>
                    Menu
                  </Button>
                </ButtonGroup>
              </div>
            </Card.Body>
          </Card>
        </Col>
        {state.lastWinner !== null ? <WinnerAlert /> : null}
      </Row>
      <Row>
        <Col md={5}>
          <Card body className="text-center">
            Player 1: {state.playerOne}
            <div className="mt-3">
              <ButtonGroup onClick={submitTurn}>
                <Button
                  value={ROCK}
                  variant="secondary"
                  disabled={!playerOneTurn}
                >
                  Rock
                </Button>
                <Button
                  value={PAPER}
                  variant="secondary"
                  disabled={!playerOneTurn}
                >
                  Paper
                </Button>
                <Button
                  value={SCISSORS}
                  variant="secondary"
                  disabled={!playerOneTurn}
                >
                  Scissors
                </Button>
              </ButtonGroup>
            </div>
          </Card>
        </Col>
        <Col md={{ span: 5, offset: 2 }}>
          <Card body className="text-center">
            Player 2: {state.playerTwo || "Computer"}
            <div className="mt-3">
              <ButtonGroup onClick={submitTurn}>
                <Button
                  value={ROCK}
                  variant="secondary"
                  disabled={!playerWtoTurn}
                >
                  Rock
                </Button>
                <Button
                  value={PAPER}
                  variant="secondary"
                  disabled={!playerWtoTurn}
                >
                  Paper
                </Button>
                <Button
                  value={SCISSORS}
                  variant="secondary"
                  disabled={!playerWtoTurn}
                >
                  Scissors
                </Button>
              </ButtonGroup>
            </div>
          </Card>
        </Col>
      </Row>

      <MenuModal
        showDialog={showDialog}
        closeDialog={() => setShowDialog(false)}
      />
    </Container>
  );
}

export default App;
