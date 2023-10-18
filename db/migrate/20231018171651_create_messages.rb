class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.text :text, null: false
      t.references :owner, null:false, foreign_key: {to_table: :users}, index: false
      t.references :channel, null: false, foreign_key: true
      t.timestamps
    end
  end
end
