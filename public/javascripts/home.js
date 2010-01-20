function maintabs()
{$("#mytabs").tabs();};
function expbar(exp,maxexp)
{
  var val;
  exp==0?val=0:val=Math.round(exp/maxexp*100);
  $("#exp").progressbar({value: val});
};
function skillbars(id)
{
  $.getJSON('/home/skills/',
    {character: id},
    function(data)
    {
      $.each(data, function(skillname,skilldata)
      {
        $('#'+skillname).progressBar(skilldata.exp);
      });
    });
};
function vitalbars(id)
{
 $.getJSON('/home/vitals',
  {character: id},
  function(data)
  {
    $.each(data, function(vital,vitaldata)
    {
      var cur=vitaldata.current;
      var maxval=vitaldata.max;
      var val;
      val=Math.round(cur/maxval*100);
      $('#'+vital).progressBar(cur,{max: maxval,textFormat:'fraction'});
    });
  });
};