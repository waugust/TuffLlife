 $(document).ready(function() {
     TUFFLIFE.views.controls.MainTabs();


 });
 var TUFFLIFE = TUFFLIFE || {};
 TUFFLIFE.models = {};
 var items = []

TUFFLIFE.utilities = {
      get_itemid : function(itemref)
      {
        return $(itemref).attr('class').split('Itemid:')[1]
      },
     get_data : function(itemid)
    {
       var item_data;

       for (i=0;i<items.length;i++)
         {
           if (items[i].item_id==itemid)
             item_data=items[i];
         }
         return item_data;
     },
     equip_item: function(itemref)
    {alert($(itemref).attr('id'))
        var item_id = TUFFLIFE.utilities.get_itemid(itemref);
        var itemdata = TUFFLIFE.utilities.get_data(item_id);alert('equip '+item_id)
        $.post('/home/equip_item',
        {itemid: item_id},
        function(data)
        {
        var equip_type  = itemdata.item_type;
        var equip_slot = itemdata.slot;
        var image = itemdata.image;
        var status = data.status;

        if (status=='OK')
        {
        $('#item_menu').detach();
        if($('#equipmentSlot_'+equip_slot).hasClass('item'))
          {
            //TODO
            TUFFLIFE.utilities.swap_equip(item_id,equip_slot);
          }
        else
          {
            //TODO

            TUFFLIFE.utilities.remove_item(itemref);
            $('#equipmentSlot_'+equip_slot).replaceWith('<img src="'+image+'" id="equipmentSLot_'+item_slot+'" class="'+equip_type+' item equipable Itemid:'+item_id+'">')
            itembind();
          };
          }
        else
        {
        //TODO
        };
        });

     },
     remove_item:
       function(itemref)
        {
         /// each items id denotes location i.e. "InventorySlot_#"
         var place = $(itemref).attr('id').split('Slot')[0];
          if (place == 'Inventory')
          {
            var inventory = new TUFFLIFE.views.Contain('inventory');
            inventory.show();
          }
          else
            {
              var bank = new TUFFLIFE.views.Contain('bank');
              bank.show();
            }

        }


}
 TUFFLIFE.events = (function(){
    $('.item').live('mouseover',function(event)
    {
      var target = (event.target)?event.target : event.srcElement;
      
      ItemDialog(target,event.pageX,event.pageY);
    });

    $('.item').live('mouseout', function(event)
    {
      $('.itemDialog').remove();
    });
    $('.item').live('click', function(event)
    {
      var target = (event.target)?event.target : event.srcElement;
      $('.itemDialog').detach();
      $('.itemMenu').detach();
      var pos=$('#'+target.id).offset();
      ItemMenu(target,pos.left,pos.top);
    });
    $('#item_menu .Equip').live('click',function(event)
    {
    alert('event '+$(event.target))

      var target = (event.target)?event.target : event.srcElement;
      TUFFLIFE.utilities.equip_item(target)
    });

    $('#item_menu .Unequip').live('click',function()
    {
    //TODO - UNEQUIP ITEM
    });

    $('#item_menu tr').live('mouseover',function()
    {
        $(this).addClass('item_menu_mouseover');
    });

    $('#item_menu tr').live('mouseout',function()
    {
        $(this).removeClass('item_menu_mouseover');
    });

    $('.close').live('click',function()
    {
      $('#item_menu').remove();
    });


 })();
 TUFFLIFE.views = {};
 TUFFLIFE.views.controls = {};
 ItemDialog = TUFFLIFE.views.controls.ItemDialog = function(itemref,x,y)
{
  var itemid = TUFFLIFE.utilities.get_itemid(itemref);
  var itemdata = TUFFLIFE.utilities.get_data(itemid);

  $('<div title="'
    +itemdata.name+
    '">"<i>'+
    itemdata.description+'</i>"<p>\n\
      <b>Slot<b>: '+itemdata.slot+
    '<br><b>Quality:</b> '+itemdata.grade+' , (<i>valued at $'+itemdata.value+
    '</i>)<p><b>Stats:<br>'+itemdata.stats
    +'</div>').dialog(
    {
      draggable: false,
      position: [x,y],
      resizable: false,
      dialogClass: 'itemDialog'
    });
    $('.ui-icon-closethick').hide();
  };
 ItemMenu = TUFFLIFE.views.controls.ItemMenu = function(itemref, x, y) {
  var itemid = TUFFLIFE.utilities.get_itemid(itemref);
  var itemdata = TUFFLIFE.utilities.get_data(itemid);
  var itemtype = itemdata.item_type
 var eq_type;
 var itemid = $(itemref).attr('class').split('Itemid:')[1].split(' ')[0];
 $(itemref).attr('id').indexOf('equipment')>=0?eq_type="Unequip":eq_type="Equip";
  switch (itemtype)
    {
    case 'Weapon':
      var first_line = '<div id="item_menu" style="left='+x+';top='+y+';display: none;position:absolute;"><table><tr class="'+eq_type+'"><td>'+eq_type+' Item</td></tr>';
    break
    case 'Armor':
      var first_line = '<div id="item_menu" style="position:absolute;left='+x+';top='+y+';display: none;"><table><tr class="'+eq_type+'"><td>'+eq_type+' Item</td></tr>';
    break
    case 'Drug':
      var first_line = '<div id="item_menu"><table><tr class="consume"><td>Consume</td></tr>';
    break
    default:
     var first_line = '<div id="item_menu"><table>'
    }
  $('body').append(first_line+
    '<tr class="bank"><td>Deposit in Bank</td></tr><tr class="trash"><td>Trash</td></tr><tr class="close"><td>Close</td></tr></table></div>')
    $('#item_menu').css({"left":x+"px","top":y+"px","position":"absolute"});
    $('#item_menu').effect('slide');

   
  };
 TUFFLIFE.views.controls.MainTabs = function() {
     $("#mytabs").tabs();
 };
 
 TUFFLIFE.views.controls.Charbars = function() {
    var location, current, max, percentage;
     $.getJSON('/home/charStats/',
     function(data) {
         $.each(data,
         function(stat,data){
            location = stat;
            current=data.current;
            max=data.max;
            
            current == 0 ? percentage = 0 : percentage = Math.round(current / max * 100);
            
            $('#' + location).progressbar({
                value: percentage
            });
            $('.' + location + 'val').text(current + '/' + max);
         })

 });
   this.increase = function(loc,value) {
    var bar = $('#'+loc)
    var stat_text = $('.'+loc+'val').text().split('/');
    var current_value = stat_text[0];
    var new_value = current_value + value;
    var percentage = Math.round((new_value/parseInt(stat_text[1]))*100);
    bar.progressbar('option','value',percentage);
    $('.'+loc+'val').text(new_value+'/'+stat_text[1]);
  };
  this.decrease = function(loc,value) {
    var bar = $('#'+loc)
    var stat_text = $('.'+loc+'val').text().split('/');
    var current_value = stat_text[0];
    var new_value = current_value - value;
    var percentage = Math.round((new_value/parseInt(stat_text[1]))*100);
    bar.progressbar('option','value',percentage);
    $('.'+loc+'val').text(new_value+'/'+stat_text[1]);
  };
 };
 TUFFLIFE.views.controls.Skillbars = function() {
     var location, current, max, percentage;
     $.getJSON('/home/skills/',
     function(data) {
         $.each(data,
         function(skillname, skilldata) {
             $.each(skilldata,
             function(index, skill) {

                 location = skilldata[index].name;

                 current = skilldata[index].current_exp;
                 max = skilldata[index].max_exp;

                 current == 0 ? percentage = 0 : percentage = Math.round(current / max * 100);
                 $('#' + location).progressbar({
                     value: percentage
                 });
                 $('.' + location + 'val').text(current + '/' + max);
             });
         });
     });

     this.increase = function(loc,value) {
        var bar = $('#'+loc)
        var stat_text = $('.'+loc+'val').text().split('/');
        var current_value = stat_text[0];
        var new_value = current_value + value;
        var percentage = Math.round((new_value/parseInt(stat_text[1]))*100);
        bar.progressbar('option','value',percentage);
        $('.'+loc+'val').text(new_value+'/'+stat_text[1]);       
        
     };

 };

 TUFFLIFE.views.Contain = function(loc) {
     ///Items
     var location = loc;
     var private_capacity;
     var private_credits;
     var private_name;

     $.getJSON('/home/get_stored_items', {
         loc: loc
     },
     function(data) {
         if (data.items !== undefined) {
             $.each(data.items,
             function(index, item) {
                 items[index] = item;
                 items[index].loc=location;
             });
         };
         private_credits = data.credits;
         private_name = data.name;
         private_capacity = data.capacity;

     });

     this.capacity = function() {
         return private_capacity;
     }
     this.credits = function() {
         return private_credits;
     }
     this.items = items;
     this.show = function() {
         this.show_items();
         this.set_capacity();
         this.set_credits();
         this.set_name();
     };
     this.show_items = function() {
         var i = 1;
         while (i <= this.capacity()) {

             var check = i > this.items.length;
             if (!check) {
                 var equip = this.items[i - 1].item_type == 'Weapon' || this.items[i - 1].item_type == 'Armor' ? 'equipable': '';
             };
             var item_image = $("<img/>", {
                 src: check ? 'images/emptyslot.png': this.items[i - 1].image,
                 id: location + 'Slot_' + i,
                 class: check ? 'emptySlot': 'item ' + 'loc:' + location + ' ' + equip + ' Itemid:' + this.items[i - 1].item_id
             });
             $('#' + location).append(item_image);
             i++;

         };
     };
     ///Name
     this.name = function() {
         return private_name;
     };
     this.set_name = function(name) {
         $('.' + location + ' .name').text(this.name())
     };
     ///room/capacity
     this.set_capacity = function(capacity) {
         $('.' + location + ' .room').text(this.room() + '/' + this.capacity());
     };
     this.room = function() {
         return this.capacity() - this.items.length;
     }
     ///Credits
     this.set_credits = function(credits) {
         $('.' + location + ' .credits').text('$ ' + this.credits());
     };
     this.add_credits = function(anamt) {
         if (typeof anamt != 'number') {
             var amt = parseInt(anamt);
         }
         var new_amount = amt + this.credits;
         this.set_credits(new_amount);
     };
     this.subtract_credits = function(anamt) {
         if (typeof anamt != 'number') {
             var amt = parseInt(anamt);
         };
         if (amt > this.credits) {
             ///TODO
             alert('too much to subtract!!');
         };
         var new_amount = this.credits - amt;
         this.set_credits(new_amount);
     };
     return this

 };
var inventory = new TUFFLIFE.views.Contain('inventory');
var bank = new TUFFLIFE.views.Contain('bank');
var skillbars =  new TUFFLIFE.views.controls.Skillbars();
var charbars = new TUFFLIFE.views.controls.Charbars();

