import "./App.css";
import Container from "react-bootstrap/cjs/Container";
import Row from "react-bootstrap/cjs/Row";
import Col from "react-bootstrap/cjs/Col";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/cjs/ButtonGroup";
import Button from "react-bootstrap/cjs/Button";

function App() {
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
              <div className="">Score: 10:9</div>
              <div className="">
                <ButtonGroup>
                  <Button variant="primary">New Game</Button>
                  <Button variant="primary">Save Game</Button>
                </ButtonGroup>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={5}>
          <Card body className="text-center">
            Player 1: Sebastian
            <div className="mt-3">
              <ButtonGroup>
                <Button variant="secondary">Rock</Button>
                <Button variant="secondary">Paper</Button>
                <Button variant="secondary">Scissors</Button>
              </ButtonGroup>
            </div>
          </Card>
        </Col>
        <Col md={{ span: 5, offset: 2 }}>
          <Card body className="text-center">
            Player 2: Computer
            <div className="mt-3">
              <ButtonGroup>
                <Button variant="secondary">Rock</Button>
                <Button variant="secondary">Paper</Button>
                <Button variant="secondary">Scissors</Button>
              </ButtonGroup>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
