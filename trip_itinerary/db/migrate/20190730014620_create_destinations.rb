class CreateDestinations < ActiveRecord::Migration[5.2]
  def change
    create_table :destinations do |t|
      t.string :from_date
      t.string :to_date
      t.references :place, foreign_key: true
      t.references :itinerary, foreign_key: true

      t.timestamps
    end
  end
end
