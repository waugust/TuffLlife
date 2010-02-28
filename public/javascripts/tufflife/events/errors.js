dojo.provide("tufflife.events.errors");
dojo.require("dijit.Dialog");

dojo.declare("errors", null, {
   noroom: function(item,destination){
      var cap = tufflife.controllers.storage[destination].capacity;
      var modal = new dijit.Dialog({
          title: "No room for your "+item+" in your "+destination,
          content: "All "+cap+" slots are filled in your "+destination+".<br>You will need to find a means to makre more room before putting the "+item+" in your "+destination+".",
          style: "width:300px"
      });
      modal.show();
   }

   });
tufflife.events.errors = new errors;