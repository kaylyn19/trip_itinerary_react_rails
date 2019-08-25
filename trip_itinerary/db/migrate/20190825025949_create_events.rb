class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :name
      t.text :description
      t.float :latitude
      t.float :longitude
      t.string :address
      t.string :labels
      t.datetime :start
      t.datetime :end

      t.timestamps
    end

    add_reference :destinations, :event, foreign_key: true
  end
end
