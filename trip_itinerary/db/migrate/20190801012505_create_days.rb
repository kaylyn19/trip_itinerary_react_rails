class CreateDays < ActiveRecord::Migration[5.2]
  def change
    create_table :days do |t|
      t.datetime :from_date
      t.datetime :to_date
      t.references :itinerary, foreign_key: true

      t.timestamps
    end
  end
end
