defmodule Backend.CalEvents.Event do
  use Ecto.Schema
  import Ecto.Changeset

  schema "events" do
    field :date, :naive_datetime
    field :description, :string
    field :name, :string
    belongs_to :user, Backend.Users.User
    has_many :comments, Backend.Comments.Comment
    timestamps()
  end

  @doc false
  def changeset(event, attrs) do
    event
    |> cast(attrs, [:date, :description, :name, :user_id])
    |> validate_required([:date, :description, :name, :user_id])
  end
end

