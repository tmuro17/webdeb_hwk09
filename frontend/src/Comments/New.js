import {useHistory} from "react-router-dom";
import {useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {create_comment} from "../api";

const CommentNew = ({eventId}) => {
  let hist = useHistory();
  let [comment, setComment] = useState({});


  const submit = ev => {
    ev.preventDefault();
    console.log(ev);
    console.log(comment);

    create_comment(comment, eventId).then((resp) => {
      if (resp["errors"]) {
        console.log("errors", resp.errors);
      } else {
        hist.push("/events/show/" + eventId);
      }
    });
  };

  const updateText = ev => {
    let cmt = Object.assign({}, comment);
    cmt["text"] = ev.target.value;
    setComment(cmt);
  };

  return (
    <Row>
      <Col>
        <h2>New Comment</h2>
        <Form onSubmit={submit}>
          <Form.Group>
            <Form.Label>
              Text:
            </Form.Label>
            <Form.Control as={"textarea"}
                          onChange={updateText}
                          value={comment.text}/>
          </Form.Group>
          <Button variant={"primary"} type={"submit"}>
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default CommentNew;
