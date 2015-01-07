
var Item = Backbone.Model.extend({
      urlRoot: '/items'
    , parse: function(response){
        console.log('In Item, response: ', JSON.stringify(response) );
        // response = {"item":{"name":"apollo","id":10},"SomeValue":300}
        // but we don't want the entire response, we only
        // need "item":{"name":"apollo","id":10}
        resultAfterProcessing = response.item;
        return resultAfterProcessing;
    }
})

var i = new Item;
i.set({'name':'apollo'});
console.log(i.toJSON());
i.save();  // <--- make a post request. Post's body will be the model attributes
console.log('i.get("id")', i.get('id') );
console.log('i.isNew()', i.isNew() );
setTimeout(function(){
    console.log('- - - - - -');
    console.log('1000 msec later, after server has responded ');
    console.log('i.get("id")', i.get('id') );
    console.log('i.isNew()', i.isNew() );
    console.log('isNew() is false because server has set id property')
}, 1000);
