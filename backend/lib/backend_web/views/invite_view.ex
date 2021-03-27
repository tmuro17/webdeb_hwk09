defmodule BackendWeb.InviteView do
  use BackendWeb, :view
  alias BackendWeb.InviteView

  def render("index.json", %{invites: invites}) do
    %{data: render_many(invites, InviteView, "invite.json")}
  end

  def render("show.json", %{invite: invite}) do
    %{data: render_one(invite, InviteView, "invite.json")}
  end

  def render("invite.json", %{invite: invite}) do
    %{id: invite.id,
      invitee: invite.invitee,
      response: invite.response,
      event_id: invite.event_id}
  end
end
