import {Button, Card, Col} from "react-bootstrap";
import {fetch_comments_by_event_id, fetch_event_by_id, fetch_invites_by_event_id} from "../api";
import {useEffect, useState} from "react";
import {Invites} from "../Invites/Show";
import {Comments} from "../Comments/Show";

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
      <Button variant={"outline-primary"} href={"/invites/new/" + event.id}>New Invite</Button>
      <Invites invites={invites}/>
      <br/>
      <Button variant={"outline-primary"} href={"/comments/new/" + event.id}>New Comment</Button>
      <Comments comments={comments}/>
    </div>
  );
};

export default EventShow;
