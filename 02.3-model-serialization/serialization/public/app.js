
var Item = Backbone.Model.extend({
      urlRoot: '/items'
    , parse: function(response){
        return response.item;
    }
})


/*

i = new Item
i.set({'name':'apollo'})
i.save()

*/
