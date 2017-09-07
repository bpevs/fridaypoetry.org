import { h, Component } from "preact";
import { Button, Card, Cards, Col, Row, Nav, NavItem, NavLogo } from "@zuck/ui";


interface Props {
  value?: string;
}

interface State {
}


export default class Page extends Component<Props, State> {
  public render(props: Props, state: State) {
    return (
      <div>
        <Row>
          <Cards style={{ maxWidth: "800px", margin: "auto" }}>
            <Col>
              <Card>
                <Card.Header center>Friday Poetry</Card.Header>
                <Card.Body>
                  Some stuff goes here. Text and shit. Yo. Gonna keep typing here for a bit until I feel cool.
                  <Button className="row">go</Button>
                </Card.Body>
                <Card.Footer center><p>Footer</p></Card.Footer>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Header center>Friday Poetry</Card.Header>
                <Card.Body>
                  Some stuff goes here. Text and shit. Yo. Gonna keep typing here for a bit until I feel cool.
                  <Button outline>go</Button>
                </Card.Body>
                <Card.Footer center>Footer</Card.Footer>
              </Card>
            </Col>
          </Cards>
        </Row>
      </div>
    );
  }
}
