import {Card, Col, Container, Row, Table} from "react-bootstrap";
import {fetch_comments_by_event_id, fetch_event_by_id, fetch_invites_by_event_id, fetch_user_by_id} from "../api";
import {useEffect, useState} from "react";

const Event = ({event}) => {
  return (
    <Col>
      <Card>
        <Card.Body>
          <Card.Title>{event.name}</Card.Title>
          <Card.Subtitle>{event.date}</Card.Subtitle>
          <Card.Text>{event.description}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

const Invites = ({invites}) => {
  let rows = invites.map((invite) => <Invite invite={invite}/>);
  return (
    <Table>
      <thead>
      <tr>
        <th>Invitee</th>
        <th>Response</th>
      </tr>
      </thead>
      <tbody>
      {rows}
      </tbody>
    </Table>
  );
};

const Invite = ({invite}) => {
  return (
    <tr>
      <td>{invite.invitee}</td>
      <td>{invite.response}</td>
    </tr>
  );
};

const Comments = ({comments}) => {
  let cards = comments.map((cmmnt) => <Comment comment={cmmnt}/>);

  return (
    <div>
      <h2>Comments:</h2>
      <Container>
        {cards}
      </Container>
    </div>
  );
};

const Comment = ({comment}) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch_user_by_id(comment.user_id).then((c) => setUser(c));
  }, [comment.user_id]);

  return (
    <Row>
      <Col>
        <Card>
          <Card.Body>
            <Card.Text><strong>Author:</strong> {user.name}</Card.Text>
            <Card.Text>{comment.text}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

const EventShow = ({eventId}) => {
  const [event, setEvent] = useState({});
  const [invites, setInvites] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
      fetch_event_by_id(eventId).then((e) => setEvent(e));
    }, [eventId]
  );

  useEffect(() => {
      fetch_invites_by_event_id(eventId).then((invts) => setInvites(invts));
    }, [eventId]
  );

  useEffect(() => {
      fetch_comments_by_event_id(eventId).then((cmts) => setComments(cmts));
    }, [eventId]
  );


  return (
    <div>
      <br/>
      <Event event={event}/>
      <br/>
      <Invites invites={invites}/>
      <br/>
      <Comments comments={comments}/>
    </div>
  );
};

export default EventShow;
