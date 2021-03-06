
def preload
   

    m=Player.new
    loc=Location.new(:name=>"Baltimore",:description=>"a dump",:levelmin=>1,:levelmax=>10,:image=>"images/locations/baltimore_fog_400_300.png")
    npc=Npc.new(:name=>"npc1")
    loc.npcs<<npc
    ch=Character.new(:name=>"Wojtek")
    m.characters<<ch
    loc.characters<<ch
    npc.location=loc
    ch.location=loc
    loc.save
    ch.save
    npc.save

        
        bag=Container.new(:name=>"brown sack",:description=>"plain brown sack",:amt => 5,:grade=>"Cheap",:stats=>{:capacity=>5})
        bag.save
        trash_items=[]
        weap_items=[]
        armor_items=[]

        trash_items<<["Cigarette butt",                                    "half smoked cigarette butt",    1,     "Trash"]
        trash_items<<["Copper wire",                                    "a piece of copper wire",        1,     "Trash"]

        trash_items.each do |tr|
         trash = Trash.new do |t|
            t.name=tr[0]
            t.description=tr[1]
            t.amt=tr[2]
            t.grade=tr[3]
          end
          trash.save
        end
        
        whiskey=Drug.new(:name=>"Whiskey",:description=>          "a bottle of cheap whiskey",:amt=>    1,:duration=>20,:grade=>"Cheap",:stats=>{:stamina=>3,:intellect=>-3})
        whiskey.save
        weap_items<<["Bat",             "2hand",                          "simple wooden bat",        20,      "Cheap",{:attack=>2}]
        weap_items<<["Knife"            ,"rhand",                          "rusty kitchen knife",           20,         "Cheap",{:attack=>1},"images/items/rusty_knife.png"]
        weap_items<<["Brass Knuckles",  "2hand",                          "brass knuckles",                20,         "Cheap",{:attack=>2}]

        weap_items.each do |wep|
         weapon = Weapon.new do |w|
            w.name=wep[0]
            w.slot=wep[1]
            w.description=wep[2]
            w.amt=wep[3]
            w.grade=wep[4]
            w.stats=wep[5]
            w.image=wep[6]
          end
          weapon.save
        end

        armor_items<<["Plaid Shirt",      "chest",                          "simple plaid shirt",            20,          "Cheap", {:defense=>1},"images/items/plaid_shirt.png"]
        armor_items<<["Gray Stamina Sweater",      "chest",                          "nice sweater!",            100,          "Decent", {:defense=>2,:stamina=>2},"images/items/gray_stamina_sweater.png"]
        armor_items<<["Gray sweat shirt",      "chest",                          "simple gray sweat shirt",            20,          "Cheap", {:defense=>1},"images/items/gray_sweat_shirt.png"]
        armor_items<<["White Tee-Shirt",      "chest",                          "simple white tee-shirt",            20,          "Cheap", {:defense=>1},"images/items/white_teeshirt.png"]
        armor_items<<["Green Tee-Shirt",      "chest",                          "simple green tee-shirt",            20,          "Cheap", {:defense=>1},"images/items/green_teeshirt.png"]
        armor_items<<["Denim Shirt",      "chest",                          "simple denim shirt",            20,          "Cheap", {:defense=>1},"images/items/denim_shirt.png"]
        armor_items<<["Faded jeans",      "pants",                          "old pair of faded blue jeans",  20,          "Cheap", {:defense=>1},"images/items/faded_jeans.png"]
        armor_items<<["Baseball Cap",       "head",                          "minor league basball cap",      20,          "Cheap", {:defense=>1},"images/items/baseball_cap.png"]


        armor_items.each do |arm|
          armor = Armor.new do |a|
            a.name=arm[0]
            a.slot=arm[1]
            a.description=arm[2]
            a.amt=arm[3]
            a.grade=arm[4]
            a.stats=arm[5]
            a.image=arm[6]
          end
          armor.save
        end



  
  base_skill_load=
    [
      ["Beg",     "Beg for strangers kindness"],
      ["Steal",   "Attempt to steal from another"],
      ["melee",   "Start a fight with somebody"],
      ["Scrounge","Scrounge around"],
      ["Work",    "Go to work"]
    ]
myTitle=Title.new(:name=>"Citizen",:description=>"Starting class")
myReq=Requirement.new(:level=>1,:kind=>"level")
myTitle.requirements<<myReq

  base_skill_load.each do |skill|
    myskill= Skill.new(:name=>skill[0],:description=>skill[1])
    myTitle.skills<<myskill
    myskill.save
  end
  myBank=Bank.new(:name=>"1st Bank")
  myinv=Inventory.new(:name=>"brown sack")
  ch.inventory=myinv
  ch.titles<<myTitle
  equipment=Equipment.new
  equipment.save
  ch.equipment=equipment
  ch.bank=myBank
  ch.setXP
  ch.save
  m.save
  
end
