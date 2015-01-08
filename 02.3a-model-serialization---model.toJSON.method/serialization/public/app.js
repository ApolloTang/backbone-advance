
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
    , toJSON: function(){
        // toJSON() is the opposite of parse
        // toJSON will be call on model.save()
        // you can use this method to modify the data you want to sent to model.
        console.log('toJSON is called, when you call save() on the model');
        dataToSend = this.attributes;
        return dataToSend;
    }
});


var i = new Item;
i.set({'name':'apollo'});
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
