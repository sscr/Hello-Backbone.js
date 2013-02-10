(function($) {
    var Item = Backbone.Model.extend({
        defaults: {
            part1: 'hello',
            part2: 'world'
        }
    });

    var List = Backbone.Collection.extend({
        model: Item
    });

    var ListView = Backbone.View.extend({
        el: $('body'),
        events: {
            'click button#add': 'addItem'
        },

        initialize: function() {
            _.bindAll(this, 'render', 'addItem', 'appendItem'); // remember: every function that uses 'this' as the current object should be in here

            this.collection = new List();
            this.collection.bind('add', this.appendItem); // collection event binder

            this.counter = 0;
            this.render();
        },
        render: function() {

            var self = this;
            $(this.el).append("<button id='add'>Add list item</button>");
            $(this.el).append("<ul></ul>");
            _(this.collection.model).each( function(item) { // in case collection is not empty
                self.appendItem(item);
            }, this);
        },

        addItem: function() {
            this.counter++;
            var item = new Item();
            item.set({
                part2: item.get('part2') + this.counter // modify item default
            });
            this.collection.add(item); // add item to collection; view is updated via event 'add'
            console.log(item.get('part1'));
            console.log(item.get('part2'));
            console.log(this.counter);
        },

        appendItem: function(item) {
            $('ul', this.el).append("<li>" + item.get('part1') + " " + item.get('part2') + "</li>");
        }
    });

    var listview = new ListView();
}) (jQuery);

// hoge.getでmodelの要素を取得
// hoge.setでmodelに要素をセット