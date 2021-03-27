import {Button, Table} from "react-bootstrap";

export const Invites = ({invites}) => {
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
      <td>
        <Button variant={"secondary"} href={"/invites/respond/" + invite.id}>Respond</Button>
      </td>
    </tr>
  );
};
