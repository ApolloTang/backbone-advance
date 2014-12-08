
var Note = Backbone.Model.extend({})

var Notes = Backbone.Collection.extend({
    model: Note
    , initialize: function(arg1, options) {
        this.doc = options.doc;
        this.on('reset', this.onReset, this)
    }
    , url: function(){
        var returnUrl = this.doc.url() + '/notes'; // "/documents/2/notes"
        console.log('in Notes, URL: ', returnUrl);
        return returnUrl;
    }
    , onReset: function() {
        console.log('Notes reseted, in Notes.onReset, this: ' , this);
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
        this.on('reset', this.getNotes, this);
        // HERE this.on('add', this)
    }
    , getNotes: function(){
        console.log('Documents reset, in getNotes(), this:', this);
        // this = Documents
        this.each(function (doc){
            doc.notes = new Notes([], {doc: doc});
            doc.notes.fetch({reset:true});
        });
    }
});

ds = new Documents();
ds.fetch({reset:true});
/*
ds.get(0)  // does not exist
ds.get(1)
ds.get(1).get('text')
ds.get(1).notes.pluck('text')
ds.create({text:"document 3"})
ds.get(3)
ds.get(3).notes.length // 0
ds.get(3).addNote("document 3, note 3.1")
ds.get(3).notes.length // 1
ds.get(3).addNote("document 3, note 3.2")
ds.get(3).notes.length // 2
ds.get(3).notes.pluck('text')


*/

