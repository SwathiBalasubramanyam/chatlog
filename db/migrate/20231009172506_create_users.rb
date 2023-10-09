class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :email, null: false, index: {unique: true}
      t.string :full_name
      t.string :display_name
      t.text :about_me
      t.string :name_pronunciation
      t.string :session_token, null: false, index: {unique: true}
      t.string :password_digest, null: false
      t.timestamps
    end
  end
end
