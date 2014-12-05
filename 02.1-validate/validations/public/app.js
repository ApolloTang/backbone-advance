var User = Backbone.Model.extend({
    defaults: {
        name: "",
        age: 0
    }
    , validate : function( attrs ) {
        debugger;
        if (attrs.age < 0 ){
            return "age must be 0 or greater";
        }
        if (attrs.name === "") {
            return "must have a name";
        }
    }
});
/*
    u = new User

    By default validate is called before save, but can also be called before set if {validate:true} is passed.

    > u.set( {name: ""},{validate:true} )
    > false

    // also {silent:true} now suppress event, it is not use to suppress validation
    // you must use {validate:true} in order to fire validate function if you are not using save()

*/
