defmodule BackendWeb.CommentView do
  use BackendWeb, :view
  alias BackendWeb.CommentView

  def render("index.json", %{comments: comments}) do
    %{data: render_many(comments, CommentView, "comment.json")}
  end

  def render("show.json", %{comment: comment}) do
    %{data: render_one(comment, CommentView, "comment.json")}
  end

  def render("comment.json", %{comment: comment}) do
    %{id: comment.id,
      user_id: comment.user_id,
      event_id: comment.event_id,
      text: comment.text}
  end
end
