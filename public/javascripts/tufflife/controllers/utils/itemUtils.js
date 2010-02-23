dojo.provide("tufflife.controllers.utils.itemUtils")
dojo.require("tufflife.data")

var setItemCtls = function(item,id){
  // alert(item.toJson)
      var stats = []
      var image = tufflife.data.itemstore.getValue(item,"image");
      var itemName = tufflife.data.itemstore.getValue(item,"item_name");
      var itemSlot = tufflife.data.itemstore.getValue(item,"slot");
      var itemGrade = tufflife.data.itemstore.getValue(item,"grade");
      var itemValue = tufflife.data.itemstore.getValue(item,"value");
      var itemDesc = tufflife.data.itemstore.getValue(item,"description");
      var childArray = tufflife.data.itemstore.getValues(item,"children");
      var loc = tufflife.data.itemstore.getValues(item,"location");
      dojo.forEach(childArray,function(child){
          var attrs = tufflife.data.itemstore.getAttributes(child);
          dojo.forEach(attrs,function(attr,index){
              var stat = tufflife.data.itemstore.getValue(child,attr);
              stats[index]="<tr><td style=\"font-style:italic;font-weight:bold;width:20%\">"+attr+":</td><td>"+stat+"</td></tr>";
          });
      });
      var toolTipText ="<table style=\"font-family:'Times New Roman', Times, serif;border:1px double black;\"><tr>"
               +"<th style=\"text-decoration:underline;text-align:center\" colspan=\"2\">"+itemName+"</th>"
               +"</tr>"
               +"<td style=\"width:100%;font-style:italic;\" colspan=\"2\">"+itemDesc+"</td>"
               +"</tr><tr>"
               +"<td style=\"font-weight:bold;width:20%\">Slot: </td>"
               +"<td class=\"item_tt_slot\">"+itemSlot+"</td>"
               +"</tr><tr>"
               +"<td style=\"font-weight:bold;width:20%\">Grade: </td>"
               +"<td>"+itemGrade+"</td>"
               +"</tr><tr>"
               +"<td style=\"font-weight:bold;width:20%\">Value: </td>"
               +"<td>"+itemValue+"</td>"
               +"</tr><tr><td style=\"font-weight:bold;width:20%\">Stats:</td></tr>"
      dojo.forEach(stats,function(stat){
          toolTipText+=stat
      });

      toolTipText+="</table>";

      var tt = new dijit.Tooltip({
          connectId: [id],
          label: toolTipText
      });

      var menu = new dijit.Menu({
            targetNodeIds: [id]
      });
      if(loc=="equipment")
          {
            menu.addChild(new dijit.MenuItem({
                label: "Unequip"
            }));
          }else
              {
              menu.addChild(new dijit.MenuItem({
                label: "Equip"
            }));
        }

      menu.addChild(new dijit.MenuItem({
          label: "Deposit"
      }));
      menu.addChild(new dijit.MenuItem({
          label: "Trash"
      }));
      menu.startup();

}