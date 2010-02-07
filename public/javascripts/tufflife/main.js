dojo.provide("tufflife.main");
dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.layout.TabContainer");
dojo.require("dijit.layout.ContentPane");
dojo.require("dojo.fx");

(function(){

  var main = tufflife.main;

  dojo.addOnLoad(function(){
    // Main Container
    var appContainer = main.appContainer = new dijit.layout.BorderContainer({},"container")

    main.toppane = new dijit.layout.ContentPane({
      id: "topPane",
      region: "top",
      content:dojo.query('#header')
    });
    main.rightpane = new dijit.layout.ContentPane({
      id: "rightPane",
      region: "right",
      style: "height: 100px",
      content: "right side"
    });
    // Tab Container
    var tabContainer = main.tabContainer = new dijit.layout.TabContainer({
      region:"center",
      tabPosition: "right-h",
      tabStrip: "true"
    },"tabs");
    main.tab1 = new dijit.layout.ContentPane({
      title:"tab1",content:"tab 1",id:"mytab1"
    });
    main.tab2 = new dijit.layout.ContentPane({
      title:"tab2",content:"tab 2",id:"mytab2"
    });

    dojo._destroyElement(dojo.byId("loading"));
    dojo.place(appContainer.domNode, dojo.body(), "first");
    appContainer.addChild(main.toppane);
    appContainer.addChild(main.rightpane);
    tabContainer.addChild(main.tab1);
    tabContainer.addChild(main.tab2);
    appContainer.addChild(tabContainer);
    appContainer.startup();

/*    dojo.connect(tabContainer,"selectChild",function(child){

      var tab = child.id
      dojo.fx.slideTo({
        node:tab,
        top: (dojo.coords(tab).t).toString(),
        left:(dojo.coords(tab).l-200).toString(),
        unit: "px"
      }).play();
    });
  */
      //tell the container to recalculate its layout...
      appContainer.layout();
      window.onresize= function(){
        appContainer.layout();
      };

   
  });

})();