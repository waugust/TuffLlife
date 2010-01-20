# This file is auto-generated from the current state of the database. Instead of editing this file, 
# please use the migrations feature of Active Record to incrementally modify your database, and
# then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your database schema. If you need
# to create the application database on another system, you should be using db:schema:load, not running
# all the migrations from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20100112165107) do

  create_table "addictions", :force => true do |t|
    t.string   "drug"
    t.integer  "degree"
    t.datetime "last_used"
    t.integer  "tolerance"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "auctionhouses", :force => true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "banks", :force => true do |t|
    t.integer  "character_id"
    t.string   "name",                         :null => false
    t.integer  "capacity",     :default => 10, :null => false
    t.integer  "credits",      :default => 0,  :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "banks_items", :id => false, :force => true do |t|
    t.integer "bank_id"
    t.integer "item_id"
  end

  create_table "characters", :force => true do |t|
    t.integer  "player_id"
    t.integer  "location_id"
    t.string   "name",                                     :null => false
    t.boolean  "flagged",        :default => false,        :null => false
    t.datetime "flagged_at"
    t.integer  "flagged_term"
    t.boolean  "wanted",         :default => false,        :null => false
    t.boolean  "intoxicated",    :default => false,        :null => false
    t.datetime "intoxicated_at"
    t.boolean  "addicted",       :default => false,        :null => false
    t.string   "job",            :default => "unemployed", :null => false
    t.integer  "exp",            :default => 0,            :null => false
    t.integer  "maxexp",         :default => 0,            :null => false
    t.integer  "level",          :default => 1,            :null => false
    t.integer  "stat_health",    :default => 100,          :null => false
    t.integer  "stat_energy",    :default => 50,           :null => false
    t.integer  "credits",        :default => 200,          :null => false
    t.integer  "stat_karma",     :default => 0,            :null => false
    t.integer  "stat_luck",      :default => 0,            :null => false
    t.integer  "stat_strength",  :default => 10,           :null => false
    t.integer  "stat_intellect", :default => 10,           :null => false
    t.integer  "stat_agility",   :default => 10,           :null => false
    t.integer  "stat_stamina",   :default => 10,           :null => false
    t.integer  "stat_attack",    :default => 1,            :null => false
    t.integer  "stat_defense",   :default => 1,            :null => false
    t.string   "adjstats"
    t.integer  "current_hp",     :default => 100,          :null => false
    t.integer  "current_en",     :default => 50,           :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "characters_titles", :id => false, :force => true do |t|
    t.integer "character_id"
    t.integer "title_id"
  end

  create_table "equipment", :force => true do |t|
    t.integer  "character_id"
    t.text     "rhand"
    t.string   "lhand"
    t.string   "chest"
    t.string   "pants"
    t.string   "head"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "histories", :force => true do |t|
    t.integer  "origid"
    t.string   "event_action"
    t.string   "targetid"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "homes", :force => true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "inventories", :force => true do |t|
    t.integer  "character_id"
    t.integer  "capacity",     :default => 5, :null => false
    t.string   "description",                 :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "inventories_items", :id => false, :force => true do |t|
    t.integer "inventory_id"
    t.integer "item_id"
  end

  create_table "items", :force => true do |t|
    t.string   "name",                       :null => false
    t.string   "slot"
    t.string   "description",                :null => false
    t.integer  "duration"
    t.string   "grade",                      :null => false
    t.integer  "amt",         :default => 0, :null => false
    t.string   "stats"
    t.string   "type"
    t.string   "image"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "locations", :force => true do |t|
    t.string   "name",        :default => "0"
    t.string   "description", :default => "0"
    t.integer  "levelmin",    :default => 0
    t.integer  "levelmax",    :default => 0
    t.string   "image"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "npcs", :force => true do |t|
    t.integer  "location_id"
    t.string   "name",                        :null => false
    t.integer  "level",       :default => 1,  :null => false
    t.integer  "heatlh",      :default => 50, :null => false
    t.integer  "credits",     :default => 50, :null => false
    t.integer  "strength",    :default => 5,  :null => false
    t.integer  "agility",     :default => 5,  :null => false
    t.integer  "stamina",     :default => 5,  :null => false
    t.integer  "attack",      :default => 1,  :null => false
    t.integer  "defense",     :default => 1,  :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "players", :force => true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "requirements", :force => true do |t|
    t.integer  "level"
    t.string   "kind"
    t.string   "req"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "requirements_titles", :id => false, :force => true do |t|
    t.integer "requirement_id"
    t.integer "title_id"
  end

  create_table "skills", :force => true do |t|
    t.integer  "title_id"
    t.string   "name",                       :null => false
    t.integer  "level",       :default => 1, :null => false
    t.integer  "exp",         :default => 0, :null => false
    t.string   "description",                :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "titles", :force => true do |t|
    t.integer  "character_id"
    t.string   "name",                          :null => false
    t.string   "level",        :default => "1", :null => false
    t.integer  "exp",          :default => 0,   :null => false
    t.string   "description",                   :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "trashes", :force => true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", :force => true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "workplaces", :force => true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
