import store from './store';

export const api_get = async path => {
  let text = await fetch("http://localhost:4000/api/v1" + path, {});
  let resp = await text.json();
  return resp.data;
};

export const api_post = async (path, data) => {
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  };

  let txt = await fetch("http://localhost:4000/api/v1" + path, options);
  return await txt.json();
};

export const fetch_users = () => {
  api_get("/users").then((data) => store.dispatch({
    type: 'users/set',
    data: data,
  }));
};

export const create_user = user => api_post("/users", {user});

export const create_invite = async (invite, event_id) => {
  let state = store.getState();
  let token = state?.session?.token;
  console.log(event_id);

  let data = new FormData();
  data.append("invite[invitee]", invite.invitee);
  data.append("invite[event_id]", event_id);

  console.log("Proper");
  console.log(data);

  let opts = {
    method: "POST",
    body: data,
    headers: {
      "x-auth": token,
    },
  };

  console.log(opts);
  let response = await fetch("http://localhost:4000/api/v1/invites", opts);
  return await response.json();
};

export const create_comment = async (comment, event_id) => {
  let state = store.getState();
  let token = state?.session?.token;
  console.log(event_id);

  let data = new FormData();
  data.append("comment[text]", comment.text);
  data.append("comment[event_id]", event_id);

  console.log(data);

  let opts = {
    method: "POST",
    body: data,
    headers: {
      "x-auth": token,
    },
  };

  let response = await fetch("http://localhost:4000/api/v1/comments", opts);
  return await response.json();
};


export const fetch_events = () => {
  api_get("/events").then((data) => store.dispatch({
    type: "events/set",
    data: data
  }));
};

export const create_event = async event => {
  let state = store.getState();
  let token = state?.session?.token;

  let data = new FormData();
  data.append("event[name]", event.name);
  data.append("event[date]", event.date);
  data.append("event[description]", event.description);

  let opts = {
    method: "POST",
    body: data,
    headers: {
      "x-auth": token,
    },
  };

  let response = await fetch("http://localhost:4000/api/v1/events", opts);
  return await response.json();
};

export const api_login = (email, password) => {
  console.log("posting login");
  api_post("/session", {email, password}).then((data) => {
    console.log("login resp", data);
    if (data.session) {
      let action = {
        type: "session/set",
        data: data.session,
      };
      store.dispatch(action);
    } else if (data.error) {
      let action = {
        type: "error/set",
        data: data.error,
      };
      store.dispatch(action);
    }
  });
};

export const fetch_event_by_id = async eventId => {
  return await api_get("/events/" + eventId);
};

export const fetch_invites_by_event_id = async eventId => {
  return await api_get("/event_invites/" + eventId);
};

export const fetch_comments_by_event_id = async eventId => {
  return await api_get("/event_comments/" + eventId);
};

export const fetch_user_by_id = async userId => {
  return await api_get("/users/" + userId);
};

export const fetch_invite_by_id = async inviteId => {
  return await api_get("/invites/" + inviteId);
};

export const respond_invite = async (response, invite_id) => {
  let state = store.getState();
  let token = state?.session?.token;

  let data = new FormData();
  data.append("id", invite_id);
  data.append("invite[response]", response);

  let opts = {
    method: "PATCH",
    body: data,
    headers: {
      "x-auth": token,
    },
  };

  let resp = await fetch("http://localhost:4000/api/v1/invites/" + invite_id, opts);
  return await resp.json();

};

export const load_defaults = () => {
  fetch_users();
  fetch_events();
};
