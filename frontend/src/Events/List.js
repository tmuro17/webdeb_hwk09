import {Row, Col, Card, Button} from "react-bootstrap";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

const Event = ({event}) => {
  return (
    <Col>
      <Card>
        <Card.Body>
          <Card.Title>{event.name}</Card.Title>
          <Card.Subtitle>{event.date}</Card.Subtitle>
          <Card.Text>{event.description}</Card.Text>
          <Button variant={"secondary"} href={"events/show/" + event.id}>View</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

const EventList = ({events}) => {
  let cards = events.map((event) => <Event event={event} key={event.id}/>);

  return (
    <div>
      <Link to="/events/new">New Event</Link>
      <Row>
        {cards}
      </Row>
    </div>
  );
};

export default connect(({events}) => ({events}))(EventList);
