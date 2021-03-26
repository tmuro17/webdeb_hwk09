defmodule Backend.Repo.Migrations.CreateEvents do
  use Ecto.Migration

  def change do
    create table(:events) do
      add :date, :naive_datetime
      add :description, :text
      add :name, :string
      add :user_id, references(:users), null: false

      timestamps()
    end

  end
end
