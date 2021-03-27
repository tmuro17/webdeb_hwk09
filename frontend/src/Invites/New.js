import {useHistory} from "react-router-dom";
import {useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {create_invite} from "../api";

const InviteNew = ({eventId}) => {
  let hist = useHistory();
  let [invite, setInvite] = useState({});


  const submit = ev => {
    ev.preventDefault();
    console.log(ev);
    console.log(invite);

    create_invite(invite, eventId).then((resp) => {
      if (resp["errors"]) {
        console.log("errors", resp.errors);
      } else {
        hist.push("/events/show/" + eventId);
      }
    });
  };

  const updateInvitee = ev => {
    let inv = Object.assign({}, invite);
    inv["invitee"] = ev.target.value;
    setInvite(inv);
  };

  return (
    <Row>
      <Col>
        <h2>New Invite</h2>
        <Form onSubmit={submit}>
          <Form.Group>
            <Form.Label>
              Invitee Email:
            </Form.Label>
            <Form.Control type={"text"}
                          onChange={updateInvitee}
                          value={invite.invitee}/>
          </Form.Group>
          <Button variant={"primary"} type={"submit"}>
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default InviteNew;
