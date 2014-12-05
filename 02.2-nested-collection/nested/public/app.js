
var Note = Backbone.Model.extend({})

var Notes = Backbone.Collection.extend({
    model: Note
    , initialize: function() {
        this.doc = options.doc;
    }
    , url: function(){
        return this.doc.url() + '/notes'; // "/documents/2/notes"
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
        this.on('reset', this.getNotes, this)
    }
    , getNotes: function(){
        this.each(function (doc){
            model.notes = new Notes([], {doc: doc});
            notes.notes.fetch();
        });
    }
});

/*


*/
