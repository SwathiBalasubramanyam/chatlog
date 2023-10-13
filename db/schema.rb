# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_10_13_072120) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "channels", force: :cascade do |t|
    t.bigint "owner_id", null: false
    t.bigint "workspace_id", null: false
    t.string "name", null: false
    t.text "description"
    t.boolean "is_channel", default: true, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["owner_id"], name: "index_channels_on_owner_id"
    t.index ["workspace_id", "name"], name: "index_channels_on_workspace_id_and_name", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "full_name"
    t.string "display_name"
    t.text "about_me"
    t.string "name_pronunciation"
    t.string "session_token", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

  create_table "workspace_members", force: :cascade do |t|
    t.bigint "member_id", null: false
    t.bigint "workspace_id", null: false
    t.string "title"
    t.integer "status", default: 0
    t.string "role"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["member_id"], name: "index_workspace_members_on_member_id"
    t.index ["workspace_id", "member_id"], name: "index_workspace_members_on_workspace_id_and_member_id", unique: true
  end

  create_table "workspaces", force: :cascade do |t|
    t.bigint "owner_id", null: false
    t.string "name", null: false
    t.string "url"
    t.string "icon"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_workspaces_on_name", unique: true
    t.index ["owner_id"], name: "index_workspaces_on_owner_id"
  end

  add_foreign_key "channels", "users", column: "owner_id"
  add_foreign_key "channels", "workspaces"
  add_foreign_key "workspace_members", "users", column: "member_id"
  add_foreign_key "workspaces", "users", column: "owner_id"
end
