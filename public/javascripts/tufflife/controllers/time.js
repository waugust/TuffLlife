dojo.provide("tufflife.controllers.time");
dojo.require("dojox.timing");


dojo.declare("timer",null,{
    health: 60000,
    energy: 120000,
    health_timer: {},
    energy_timer: {},
    health_timer_running: false,
    energy_timer_running: false,
    setClock: function(){
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        seconds = seconds+""
        seconds = seconds<10?'0'+seconds:seconds+"";
        minutes = minutes<10?'0'+minutes:minutes+"";
        var ampm = hours>12?' PM':' AM'
        hours = hours>12?hours-12:hours;

        var time = hours+":"+minutes+"."+seconds+ampm
        dojo.empty('time');

        dojo.attr('time', 'innerHTML', time);
    },
    updateClock: function(){
        var timing = new dojox.timing.Timer(1000);
        var that = this;
        timing.onTick= function(){
            that.setClock();
        };
        timing.start();
    },
    updateStat: function(stat){
        var time = this[stat];
        var stat_timer = new dojox.timing.Timer(time);
        var that = this;
        var td_time = time/1000
        if(this[stat+'_timer_running'])
            {
                this.stopTimer(stat);
            }
        this.timerDisplay(stat, td_time);

        stat_timer.onTick = function(){
            tufflife.controllers.character.stats.set({type:stat,increase:1});
            if (!tufflife.controllers.character.stats.health_maxed)
                {
                    that.timerDisplay(stat, td_time)
                }
                else
                    {
                        dojo.empty(stat+'_counter');
                        stat_timer.stop();
                    }
        };
        stat_timer.start();
    },
    timerDisplay: function(stat,time){
        if(this[stat+'_timer_running'])
            {
                this.stopTimer(stat)
            }
        this[stat+'_timer'] = new dojox.timing.Timer(1000);
        this[stat+'_timer_running']=true
        var secs = time;
        var that = this;

        this[stat+'_timer'].onTick = function(){
            secs-=1;
            var seconds = secs%60;
            var minutes = parseInt(secs/60);

            seconds = seconds<10?"0"+seconds:seconds+"";
            minutes = minutes==0?"":minutes;

            var display_timer = minutes+":"+seconds
        
            dojo.attr(stat+"_counter", "innerHTML", display_timer);
            if (secs==0)
                {
                    that[stat+'_timer'].stop();
                    this[stat+'_timer_running']=false;

                }
        };
        this[stat+'_timer'].start();

    },
    stopTimer: function(stat){
        this[stat+'_timer'].stop();
        this[stat+'_timer_running']=false;
        dojo.empty(stat+'_counter');
    },
    constructor: function(){

        this.setClock();
        this.updateClock();

    }
});

tufflife.controllers.time = new timer;