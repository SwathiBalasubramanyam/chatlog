class CreateWorkspaces < ActiveRecord::Migration[7.0]
  def change
    create_table :workspaces do |t|
      t.references :owner, null:false, foreign_key: {to_table: :users}
      t.string :name, null:false, index: {unique: true}
      t.string :url
      t.string :icon
      t.timestamps
    end
  end
end
