 $(document).ready(function()
{
  get_inventory();
  mainback();
  maintabs();
 expbar();
skillbars();
vitalbars();
  itembind();
  
});


function maintabs()
{$("#mytabs").tabs();};
function expbar()
{
  $.getJSON('/home/exp',function(data)
  {
    var exp=data.exp;
    var maxexp=data.maxexp;
  
  var val;
  exp==0?val=0:val=Math.round(exp/maxexp*100);
  $("#exp").progressbar({value: val});
  $("td.exp_value").text(exp+'/'+maxexp)
  });
};
function skillbars()
{
  $.getJSON('/home/skills/',
    //{character: id},
    function(data)
    {
      $.each(data, function(skillname,skilldata)
      {
        $('#'+skillname).progressBar(skilldata.exp);
      });
    });
};
function vitalbars()
{
 $.getJSON('/home/vitals',
  //{character: id},
  function(data)
  {
    $.each(data, function(vital,vitaldata)
    {
      var cur=vitaldata.current;
      var maxval=vitaldata.max;
      //var val=Math.round(cur/maxval*100);;
      $('#'+vital).progressBar(cur,{max: maxval,textFormat:'fraction'});
    });
  });
};
function itembind()
{
  
  if ($('.item').length>0)
  {
    $('.item').each(function()
    {
      var current = this;
      var id=getid(current);
      $.getJSON('/home/get_item',
        {item: id},
        function(data)
        {
          $(current).data(data);
        });
      var current = this;
      this.onmouseover = function(event)
      {
        target = (event.target)?event.target : event.srcElement;
        itemdialog(target,event.pageX,event.pageY);
      };
      this.onmouseout = function(event)
      {
       $('.itemDialog').remove();
      }
      this.onclick=function(event)
      {
        target = (event.target)?event.target : event.srcElement;
        $('.itemDialog').remove();
        $('.itemMenu').remove();
        pos=$('#'+target.id).offset();
        itemmenu(target,pos.left,pos.top);
      }

    });
  };

};
function itemdialog(itemref,x,y)
{
  $('<div title="'
    +$(itemref).data('name')+
    '">"<i>'+
    $(itemref).data('description')+'</i>"<p>\n\
      <b>Slot<b>: '+$(itemref).data('slot')+
    '<br><b>Quality:</b> '+$(itemref).data('grade')+' , (<i>valued at $'+$(itemref).data('value')+
    '</i>)<p><b>Stats:<br>'+$(itemref).data('stats')
    +'</div>').dialog(
    {
      draggable: false,
      position: [x,y],
      resizable: false,
      dialogClass: 'itemDialog'
    });
    $('.ui-icon-closethick').hide();
  };
function getid(itemref)
{
 return $(itemref).attr('class').split('Itemid:')[1].split(' ')[0];
};
function itemmenu(itemref,x,y)
{
 var itemtype = $(itemref).data('item_type')
 var eq_type;
 var itemid = getid(itemref);
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

    $('#item_menu .Equip').bind('click',function()
    {

     equip_item(itemref);
    });

    $('#item_menu .Unequip').bind('click',function()
    {
      unequip_item(itemref);
    });

    $('#item_menu tr').bind('mouseover',function()
    {
      $(this).each(function(index)
      {
        $(this).addClass('item_menu_mouseover');
      });
    });

    $('#item_menu tr').bind('mouseout',function()
    {
      $(this).each(function(index)
      {
        $(this).removeClass('item_menu_mouseover');
      });
    });

    $('.close').bind('click',function()
    {
      $('#item_menu').remove();
    });
};
function mainback(path)
{
  $.getJSON('/home/location',
 function(data)
  {
    var path=data.path;
    $('#main').css({"background-image":"url('"+path+"')","background-repeat":"no-repeat"});
  });
};
function swapequip(item_id,slot)
{
  
  var equip_item = '.Itemid:'+item_id;
  var swap_item = '#equipmentSlot_'+slot;
  alert($(equip_item).html());
  alert($(swap_item).html());
  $(equip_item).replaceWith($(swap_item))
};
function unequip_item(item)
{
 var item_id=getid(item)
 $.post('/home/unequip_item',
  {itemid: item_id},
  function(data)
  {
    if (parseInt($('.inventory .room').text().split('/')[0])>0)
    {
      var first_empty=$('.inventory').nextAll('.emptySlot:first');
      var item_image=$(item).data('item_image');
      var inv_room = $('.inventory .room').text().split('/')[0]-1
      var inv_cap = $('.inventory .room').text().split('/')[1]
      $(first_empty).replaceWith("<img src='"+item_image+"' id='"+$(first_empty).attr('id')+"' class='item equipable Itemid:"+$(item).data('item_id')+"'>");
      var new_room = inv_room+'/'+inv_cap;
      $('.inventory .room').text(new_room);
      $('#item_menu').remove();
      remove_item(item);
      itembind();
    }
    else
    {
      //TODO
    }
  });
};
function equip_item(item)
{
  var item_id = getid(item);
 $.post('/home/equip_item',
  {itemid: item_id},
  function(data)
  {
  var equip_type  = $(item).data('item_type');
  var equip_slot = $(item).data('slot');
  var image = $(item).data('item_image');
  var status = data.status;
  var item_id = $(item).data('item_id');
  var item_slot = $(item).data('slot');

  if (status=='OK')
    {
      $('#item_menu').remove();
      if($('#equipmentSlot_'+equip_slot).hasClass('item'))
        {
          swapequip(item_id,equip_slot);
        }
        else
        { 
         remove_item(item);
         $('#equipmentSlot_'+equip_slot).replaceWith('<img src="'+image+'" id="equipmentSLot_'+item_slot+'" class="'+equip_type+' item equipable Itemid:'+item_id+'">')
         itembind();
        };
    }
    else
    {
     //TODO
    };
});

};
function remove_item(item)
{
 var place = $(item).attr('id').split('Slot')[0];
 var cap_split=$('.'+place+' .room').text().trim().split('/');
 var space = cap_split[0];
 var cap = cap_split[1];
 $(item).replaceWith("<img src='images/emptyslot.png' class='emptySlot' id='"+$(item).attr('id')+"'>");
 if (place!=='equipment'){
  $('.'+place+' .room').text(parseInt(space)+1+'/'+cap);
 };
};

//////////////////////////////////
function set_inventory(item)
{

};
function set_bank(item)
{

};
function set_equipment(item)
{

};
function get_inventory()
{
    $.get('home/get_all_items',
    function(xml)
    {
      $(xml).find('inventory').each(function()
    {
      var inventory_items=$(this).find('items').find('item').size()
      $('.inventory .name').text($(this).find('storage').find('name').text())
      $('.inventory .credits').text('$ '+$(this).find('storage').find('credits').text())
      var inv_capacity = $(this).find('storage').find('room').text()
      $('.inventory .room').text(inv_capacity-inventory_items+'/'+inv_capacity)
      var count=0;
      var item_info_image = new Array()
      var item_info_id = new Array()
      $(this).find('items').find('item').each(function()
    {
      item_info_image[count]=$(this).find('image').text();
      item_info_id[count]=$(this).find('id').text()
      count++;
    })
   
      var i=1;
        while (i<=inv_capacity)
          {
            var appended;
            if (i>inventory_items)
              {
                appended = "<img src='images/emptyslot.png' class='emptySlot' id='inventorySlot_"+i+"'>"
              }
              else
              {
                appended = "<img src='"+item_info_image[i-1]+"' id='inventorySlot_"+i+"' class='item equipable Itemid:"+item_info_id[i-1]+"'>"
              };
            $('#inventory').append(appended)
            i++;
          }
    });
    },'xml');
};

  
