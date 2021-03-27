import {Card, Col, Container, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {fetch_user_by_id} from "../api";

export const Comments = ({comments}) => {
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
