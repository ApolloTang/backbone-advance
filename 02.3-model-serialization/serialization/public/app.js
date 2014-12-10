
var Item = Backbone.Model.extend({
      urlRoot: '/items'
    , parse: function(response){
        console.log('In Item, response: ', response);
        return response.item;
    }
})

var i = new Item;
i.set({'name':'apollo'});

/*

i = new Item
i.set({'name':'apollo'})
i.save()

*/
