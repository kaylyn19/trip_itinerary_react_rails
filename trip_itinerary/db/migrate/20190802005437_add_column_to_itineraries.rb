class AddColumnToItineraries < ActiveRecord::Migration[5.2]
  def change
    add_column :itineraries, :start, :datetime
    add_column :itineraries, :end, :datetime
  end
end
