class CreateWorkspaceMembers < ActiveRecord::Migration[7.0]
  def change
    create_table :workspace_members do |t|
      t.references :member, null:false, foreign_key: {to_table: :users}
      t.references :workspace, null:false, index: false
      t.string :title
      t.integer :status, default: 0
      t.string :role
      t.timestamps
      t.index [:workspace_id, :member_id], unique: true
    end
  end
end
