
var Note = Backbone.Model.extend({})

var Notes = Backbone.Collection.extend({
    model: Note
    , initialize: function(arg1, options) {
        console.log('Notes initialize')
        this.doc = options.doc;
    }
    , url: function(){
        var returnUrl = this.doc.url() + '/notes'; // "/documents/2/notes"
        debugger;
        console.log('in Notes, URL: ', returnUrl);
        return returnUrl;
    }
})

var Document = Backbone.Model.extend({
    initialize: function() {
        this.notes = new Notes([], {doc:this});
    }
    , addNote : function( text ) {
        // this.notes.add({ text:text })
        this.notes.create({ text:text })
            // create
            //    instantiating a model with a hash of attributes,
            //    saving the model *to the server*, and adding
            //    the model to the set after being successfully
            //    created. Returns the new model. If client-side
            //    validation failed, the model will be unsaved
            //    with validation errors. In order for this to
            //    work, you should set the
    }
});


var Documents = Backbone.Collection.extend({
    model : Document
    , url: '/documents'
    , initialize: function(){
        console.log('Documents reset!')
        this.on('reset', this.getNotes, this)
    }
    , getNotes: function(){
        console.log('in getNotes')
        this.each(function (doc){
            doc.notes = new Notes([], {doc: doc});
            debugger;
            doc.notes.fetch();
        });
    }
});

ds = new Documents();
ds.fetch({reset:true});
/*


*/
