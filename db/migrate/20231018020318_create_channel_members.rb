class CreateChannelMembers < ActiveRecord::Migration[7.0]
  def change
    create_table :channel_members do |t|
      t.references :member, null:false, foreign_key: {to_table: :users}
      t.references :channel, null:false, foreign_key: {to_table: :channels}, index: false
      t.boolean :active, null:false, default: true
      t.index [:channel_id, :member_id], unique: true
      t.timestamps
    end
  end
end
