dojo.provide("tufflife.controllers.character");

(function(){
 //   dojo.addOnLoad(function(){

    dojo.declare("character", null, {
        stats: {
          exp: 0,
          health:0,
          energy:0,
          health_maxed: false,
          energy_maxed: false,
          get: function(stat){
              var _stat;

            tufflife.data.stats.fetchItemByIdentity({
                identity:stat,
                onItem: function(item,response){
                    _stat = tufflife.data.stats.getValue(item,'current');
                }
                })
                return _stat;
          },
          set: function(stat){
              if(stat.max)
                {
                    tufflife.controllers.character.stats[stat.type]=stat.max
                }

              var _max = stat.max || this[stat.type];
              var _stat = stat.type;
              var _current = stat.current || this.get(stat.type);
              var increase = stat.increase || 0;
              if(!stat.init)
                  {
              if(increase)
                  {
                      if(_stat!='exp')
                          {
                           var end_value = _current+increase
                           if (end_value>_max){
                               end_value -= _max
                              increase -= end_value
                            }
                          }
                      _current+=increase
                      stat.current=_current
                  }
                  var check = _current>_max;

              if(check){stat.current=_max;_current=_max}
              if (_current<=_max){
                  //update item store
                  tufflife.data.stats.fetchItemByIdentity({
                      identity: stat.type,
                      onItem: function(item){
                          if(stat.current){
                          tufflife.data.stats.setValue(item,'current',_current);
                          }
                          if(stat.max){
                              tufflife.data.stats.setValue(item,'max',_max);
                          }
                      }
                  })
                  
               //   };

                  dojo.byId(_stat+'val').innerHTML=_current+'/'+_max
                  dijit.byId(_stat+'ProgBar').update({
                      maximum: _max,
                      progress: _current
                  });

              }
                  }
              else
                  {
                     dojo.byId(_stat+'val').innerHTML=_current+'/'+_max
                          dijit.byId(_stat+'ProgBar').update({
                              maximum: _max,
                              progress: _current
                          });
                  }
          }
        },
        skills: {
            get: function(skill){
                var current;
                tufflife.data.skills.fetchItemByIdentity({
                    identity:skill,
                    onItem: function(item,response){
                        current = tufflife.data.skills.getValue(item,"current_exp")
                    }
                })
                return current;
            },
            set: function(skill,amt){
                var max;
                tufflife.data.skills.fetchItemByIdentity({
                    identity: skill,
                    onItem: function(item,response){
                        max = tufflife.data.skills.getValue(item,'max_exp');
                        tufflife.data.skills.setValue(item,'current_exp',amt);
                    }
                })
                tufflife.data.skills.save();
                dijit.byId(skill+'ProgBar').update({
                    progress: amt
                });
                dojo.byId('skill'+skill+'_val').innerHTML=amt+'/'+max;
            }
        },
        
        constructor: function(){
            var that = this;
            var stats = ['exp','health','energy'];
            dojo.forEach(stats,function(stat,index){

            tufflife.data.stats.fetchItemByIdentity({
                identity:stat,
                onItem: function(item,response){
                    var _stat = {};
                    _stat.init = true;
                    _stat.current = tufflife.data.stats.getValue(item,'current');
                    _stat.type = stat;
                    _stat.max = tufflife.data.stats.getValue(item,'max');
                    that.stats.set(_stat);
                }
                    
            });
            });

            tufflife.data.functions.checkMaxed('health');
            tufflife.data.functions.checkMaxed('energy');
        }})

  
        tufflife.controllers.character = new character();
  //  })
})();