class CreateDestinations < ActiveRecord::Migration[5.2]
  def change
    create_table :destinations do |t|
      t.references :place, foreign_key: true
      t.references :day, foreign_key: true
    end
  end
end
