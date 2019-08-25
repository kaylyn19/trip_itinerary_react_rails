class DropColumnFromDestinations < ActiveRecord::Migration[5.2]
  def change
    remove_column :destinations, :event_id
    add_reference :events, :day, foreign_key: true
  end
end
