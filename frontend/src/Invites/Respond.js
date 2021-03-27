import {useEffect, useState} from "react";
import {create_event, fetch_events, fetch_invite_by_id, respond_invite} from "../api";
import {Button, Form} from "react-bootstrap";
import {useHistory} from "react-router-dom";

export const InviteRespond = ({inviteId}) => {
  let hist = useHistory();
  const [invite, setInvite] = useState({});
  const [response, setResponse] = useState("");

  useEffect(() => {
    fetch_invite_by_id(inviteId).then((i) => setInvite(i));
  }, [inviteId]);

  console.log("Test")
  console.log(invite)

  const onSubmit = ev => {
    ev.preventDefault();
    console.log(ev);
    console.log(response);



    respond_invite(response, inviteId).then(() => {
      hist.push("/events/show/" + invite.event_id);
    });
  };

  const updateResponse = ev => {
    setResponse(ev.target.value);
  };

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>Response:</Form.Label>
          <Form.Control as="select"
                        onChange={updateResponse}>
            <option>Haven't Responded</option>
            <option>Yes</option>
            <option>Maybe</option>
            <option>No</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};


