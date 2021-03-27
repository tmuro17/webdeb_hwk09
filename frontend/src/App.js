import {Container} from "react-bootstrap";
import {Route, Switch} from "react-router-dom";

import "./App.scss";
import Nav from "./Nav";
import EventList from "./Events/List";
import UserList from "./Users/List";
import UserNew from "./Users/New";
import EventNew from "./Events/New";
import EventShow from "./Events/Show";
import InviteNew from "./Invites/New";
import {InviteRespond} from "./Invites/Respond";
import CommentNew from "./Comments/New";

const App = () => {
  return (
    <Container>
      <Nav/>
      <Switch>
        <Route path="/" exact>
          <EventList/>
        </Route>
        <Route path="/events/new" exact>
          <EventNew/>
        </Route>
        <Route path="/events/show/:eventId" exact render={(props) => {
          let id = props.match.params.eventId;
          return <EventShow eventId={id}/>;
        }}/>
        <Route path="/invites/new/:eventId" exact render={(props) => {
          let id = props.match.params.eventId;
          return <InviteNew eventId={id}/>;
        }}/>
        <Route path="/comments/new/:eventId" exact render={(props) => {
          let id = props.match.params.eventId;
          return <CommentNew eventId={id}/>;
        }}/>
        <Route path="/invites/respond/:inviteId" exact render={(props) => {
          let id = props.match.params.inviteId;
          return <InviteRespond inviteId={id}/>;
        }}/>
        <Route path="/users" exact>
          <UserList/>
        </Route>
        <Route path="/users/new" exact>
          <UserNew/>
        </Route>
      </Switch>
    </Container>
  );
};

export default App;
