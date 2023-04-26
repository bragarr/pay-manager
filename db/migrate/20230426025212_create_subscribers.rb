class CreateSubscribers < ActiveRecord::Migration[7.0]
  def change
    create_table :subscribers do |t|
      t.string :first_name
      t.string :last_name
      t.string :category
      t.string :user_id

      t.timestamps
    end
    add_index :subscribers, :user_id
  end
end
