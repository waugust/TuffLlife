dojo.addOnLoad(function(){
    dojo.registerModulePath("tufflife","../tufflife");
    dojo.require("tufflife.data");
    dojo.require("tufflife.controllers.storage");
    dojo.require("tufflife.controllers.character");
    dojo.require("tufflife.controllers.equipment");
    dojo.require("tufflife.controllers.item")
    dojo.require("tufflife.events.subscribers",true)
    dojo.require("tufflife.events.errors");
    
    dojo.addOnLoad(function(){
        dojo.require("tufflife.main");
        dojo.require('tufflife.controllers.time');
        })

})
