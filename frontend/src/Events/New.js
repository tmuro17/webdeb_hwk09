import {useHistory} from "react-router-dom";
import {useState} from "react";
import {create_event, fetch_events} from "../api";
import {Form, Row, Col, Button} from "react-bootstrap";

const EventNew = () => {
  let hist = useHistory();
  let [event, setEvent] = useState({});

  const submit = ev => {
    ev.preventDefault();
    console.log(ev);
    console.log(event);
    create_event(event).then((resp) => {
      if (resp["errors"]) {
        console.log("errors", resp.errors);
      } else {
        hist.push("/");
        fetch_events();
      }
    });
  };

  const updateName = ev => {
    let evnt = Object.assign({}, event);
    evnt["name"] = ev.target.value;
    setEvent(evnt);
  };

  const updateDescription = ev => {
    let evnt = Object.assign({}, event);
    evnt["description"] = ev.target.value;
    setEvent(evnt);
  };

  const updateDate = ev => {
    let evnt = Object.assign({}, event);
    evnt["date"] = ev.target.value;
    setEvent(evnt);
  };

  return (
    <Row>
      <Col>
        <h2>New Event</h2>
        <Form onSubmit={submit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text"
                          onChange={updateName}
                          value={event.name}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control type="datetime-local"
                          onChange={updateDate}
                          value={event.date}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea"
                          rows={4}
                          onChange={updateDescription}
                          value={event.description}/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default EventNew;
