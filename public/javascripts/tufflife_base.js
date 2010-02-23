dojo.addOnLoad(function(){
    dojo.registerModulePath("tufflife","../tufflife");
    dojo.require("tufflife.data");
    dojo.require("tufflife.controllers.storage");
    dojo.require("tufflife.controllers.character");
    dojo.require("tufflife.controllers.equipment");
    
    dojo.addOnLoad(function(){
        dojo.require("tufflife.main");
        })

})
