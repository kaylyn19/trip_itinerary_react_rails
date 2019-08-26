class CreateAttendingEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :attending_events do |t|
      t.references :event, foreign_key: true
      t.references :day, foreign_key: true

      t.timestamps
    end

    change_column :days, :from_date, :date
    change_column :days, :to_date, :date
  end
end
