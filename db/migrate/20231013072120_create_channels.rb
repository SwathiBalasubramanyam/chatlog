class CreateChannels < ActiveRecord::Migration[7.0]
  def change
    create_table :channels do |t|
      t.references :owner, null: false, foreign_key: {to_table: :users}
      t.references :workspace, null: false, foreign_key: true, index: false
      t.string :name, null: false
      t.text :description 
      t.boolean :is_channel, null: false, default: true
      t.index [:workspace_id, :name], unique: true
      t.timestamps
    end
  end
end
