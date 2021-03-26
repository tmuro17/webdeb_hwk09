import {Container} from "react-bootstrap";
import {Route, Switch} from "react-router-dom";

import "./App.scss";
import Nav from "./Nav";
import EventList from "./Events/List";
import UserList from "./Users/List";
import UserNew from "./Users/New";
import EventNew from "./Events/New";
import EventShow from "./Events/Show";

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
          let id = props.match.params.eventId
          return <EventShow eventId={id}/>
        }}/>

        <Route path="/users" exact>
          <UserList/>
        </Route>
        <Route path="/users/new" exact>
          <UserNew />
        </Route>
      </Switch>
    </Container>
  );
};

export default App;
