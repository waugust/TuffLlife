//dojo.provide("tufflife.data");
dojo.require("dojo.data.ItemFileWriteStore");

(function(){
  dojo.addOnLoad(function(){
  var data = tufflife.data;

  dojo.declare("data.Items",dojo.data.ItemFileWriteStore,{
    constructor: function(){
      var itemstore = new data.Items(){
        url: "/home/getItems"
        }
      itemstore.fetch()
    }
  });
  });

})();