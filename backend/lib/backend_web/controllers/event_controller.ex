defmodule BackendWeb.EventController do
  use BackendWeb, :controller

  alias Backend.CalEvents
  alias Backend.CalEvents.Event

  alias BackendWeb.Plugs
  plug Plugs.RequireAuth when action
    in [:create]

  action_fallback BackendWeb.FallbackController

  def index(conn, _params) do
    events = CalEvents.list_events()
    render(conn, "index.json", events: events)
  end

  def create(conn, %{"event" => event_params}) do
    user_id = conn.assigns[:current_user].id
    with {:ok, %Event{} = event} <- CalEvents.create_event(event_params, user_id) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.event_path(conn, :show, event))
      |> render("show.json", event: event)
    end
  end

  def show(conn, %{"id" => id}) do
    event = CalEvents.get_event!(id)
    render(conn, "show.json", event: event)
  end

  def update(conn, %{"id" => id, "event" => event_params}) do
    event = CalEvents.get_event!(id)

    with {:ok, %Event{} = event} <- CalEvents.update_event(event, event_params) do
      render(conn, "show.json", event: event)
    end
  end

  def delete(conn, %{"id" => id}) do
    event = CalEvents.get_event!(id)

    with {:ok, %Event{}} <- CalEvents.delete_event(event) do
      send_resp(conn, :no_content, "")
    end
  end
end
