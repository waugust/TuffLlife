dojo.provide("tufflife.main");
dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.layout.TabContainer");
dojo.require("dijit.layout.ContentPane");
dojo.require("dijit.ProgressBar");
dojo.require("dojo.fx");
dojo.require("dijit.layout.AccordionContainer");

 (function(){
//dojo.addOnLoad(function(){

    dojo.declare("gui",null,{

       expbar: new dijit.ProgressBar({
           id: "expProgBar",
           style: "width: 500px"
       },"exp"),
       healthbar: new dijit.ProgressBar({
           id: "healthProgBar",
           style: "width: 100px"
       },"health"),
       energybar: new dijit.ProgressBar({
           id: "energyProgBar"
       },"energy"),
       appContainer:  new dijit.layout.BorderContainer({},"container"),
        topPane: new dijit.layout.ContentPane({
            id: "topPane",
            region: "top",
            style: "widht:950px",
            content:dojo.query('#header')
          }),
        rightPane: new dijit.layout.ContentPane({
          id: "rightPane",
          region: "right",
          style: "width: 200px",
          content: dojo.query('#rightside')
        }),
        tabContainer: new dijit.layout.TabContainer({
          region:"center",
          tabPosition: "right-h",
          tabStrip: "true",
          style: "width: 700px"
          },"tabs"),
        mainTab : new dijit.layout.ContentPane({
          title:"Main",id:"mainTab"
          }),
        skillsTab : new dijit.layout.ContentPane({
             title:"Skills",id:"skillsTab",
             content: dojo.query('#skills #titles')
         }),
         inventoryTab : new dijit.layout.ContentPane({
            title:"Inventory",id:"inventoryTab",
            content: dojo.query('#inventory')
         }),
         equipmentTab : new dijit.layout.ContentPane({
            title:"Equipment",id:"equipmentTab",
            content: dojo.query('#equipment')
         }),
         bankTab : new dijit.layout.ContentPane({
            title:"Bank",id:"bankTab",
            content: dojo.query('#bank')
         }),
        createSkillbars: function(){
             
             
             var titleContainer = new dijit.layout.AccordionContainer({style:"heigth: 300px"},"titles")
            tufflife.data.skills.fetch({query: {type:"title"},
                onComplete: function(items,response){
                 dojo.forEach(items,function(title,index){
                    
                     var _title = tufflife.data.skills.getValue(title,"name");
                     var _titleAcc = new dijit.layout.ContentPane({
                            title: _title,
                            id: _title+'Pane',
                            content:''
                        })

                     titleContainer.addChild(_titleAcc);
                     titleContainer.startup();
                        var skillTable = _title+'Table';
                       dojo.create("table",{id:skillTable},_title+'Pane',"first")
                       var rownum = 1;
                   tufflife.data.skills.fetch({query: {title:_title},
                        onComplete: function(items,response){
                            dojo.forEach(items,function(skill,index){
                                
                                var skillname = tufflife.data.skills.getValue(skill,'name'); 
                                var skilllevel = tufflife.data.skills.getValue(skill,'level');
                                var skillcurrent = tufflife.data.skills.getValue(skill,'current_exp');
                                var skillmax = tufflife.data.skills.getValue(skill,'max_exp');
                                var rowid = 'Skillrow'+rownum;
                                var skillProgBarDiv = skillname+'_div';
                                
                                dojo.create("tr",{id:rowid},skillTable,"last");
                                dojo.create("td",{innerHTML:skillname},rowid,"last");
                                dojo.create("td",{innerHTML:"Level"},rowid,"last");
                                dojo.create("td",{innerHTML:skilllevel,id:skillname+'_level'},rowid,"last");
                                dojo.create("td",{id:'skillCell'+index},rowid,"last");
                                dojo.create("div",{id:skillProgBarDiv},'skillCell'+index,"first");
                                dojo.create("td",{id:'skill'+skillname+'_val',innerHTML:skillcurrent+'/'+skillmax},rowid,"last");
                                rownum++
                                var skillProgBarDiv = skillname+'_div';
                                var skillBar = new dijit.ProgressBar({
                                    id:skillname+'ProgBar',
                                    style: "width:80px"
                                    },skillProgBarDiv);
                                skillBar.update({
                                    maximum:skillmax,
                                    progress:skillcurrent
                                })

                            })
                         }})
                 })
               }
            })
       },
         constructor: function(){
             
            dojo._destroyElement(dojo.byId("loading"));
           
            dojo.place(this.appContainer.domNode, dojo.body(), "first");

            this.appContainer.addChild(this.topPane);
            this.appContainer.addChild(this.rightPane);
            this.tabContainer.addChild(this.mainTab);
            this.tabContainer.addChild(this.skillsTab);
            this.tabContainer.addChild(this.inventoryTab);
            this.tabContainer.addChild(this.bankTab);
            this.tabContainer.addChild(this.equipmentTab)
            this.appContainer.addChild(this.tabContainer);
            this.appContainer.startup();
            this.appContainer.layout();
            this.createSkillbars();
 
dojo.query('.loading').removeClass('loading');
         }
    });

 

    tufflife.main.gui = new gui();
 // });

})();