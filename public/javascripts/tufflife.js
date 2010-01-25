

function Inventory() {
    ///Items
    var items = [];
    var cap,cred, nam;
    
    this.get_items = function() {
        $.getJSON('/home/get_inventory',
        function(data) {
            $.each(data.items,
            function(index,item) {
                items[index] = item;
            });
        cap = data.capacity;
        cred = data.credits;
        nam=data.name;
        });
    }();
    this.capacity = function(){return cap;}
    this.credits= function(){return cred;}
    this.items = items;

    this.show_items = function() {
        var i = 1;
        while (i <= this.capacity()) {
            var appended;
            if (i > this.items.length) {
                appended = "<img src='images/emptyslot.png' class='emptySlot' id='inventorySlot_" + i + "'>"
            } else {
                appended = "<img src='" + this.items[i - 1].image + "' id='inventorySlot_" + i + "' class='item equipable Itemid:" + this.items[i - 1].item_id + "'>"
            };
            $('#inventory').append(appended);i++;
        };
    };
    ///Name
    this.name = function(){return nam;};
    this.set_name = function(name) {
        $('.inventory .name').text(this.name())
    };
    ///room/capacity

    this.set_capacity = function(capacity) {
        $('.inventory .room').text(this.room() + '/' + this.capacity());
    };
    this.room = function(){return this.capacity() - this.items.length;}
    ///Credits
    
    this.set_credits = function(credits) {
        $('.inventory .credits').text('$ ' + this.credits());
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
    
    // (function(){
    //    this.get_items();
    //    this.show_items();
    //    this.set_name();
    //    this.set_capacity();
    //    this.set_credits();
    //})();
};