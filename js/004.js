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

    var ItemView = Backbone.View.extend({
        tagName: 'li', // this.elで指定したルートタグの名前
        initialize: function () {
            _.bindAll(this, 'render'); // 現在のオブジェクトの全てのfucntionは'this'を使用する事で呼び出せる
        },
        render: function () {
            $(this.el).html('<span>' + this.model.get('part1') + ' ' + this.model.get('part2') + '</span>');
            return this; // 繋げて使用する事ができ、 .render().elと同じような使い方が出来る
        }
    });

    var ListView = Backbone.View.extend({
        el: $('body'), // elは既存の要素にアタッチされる
        events: {
            'click button#add': 'addItem'
        },
        initialize: function () {
            _.bindAll(this, 'render', 'addItem', 'appendItem'); // 現在のオブジェクトの全てのfucntionは'this'を使用する事で呼び出せる

            this.collection = new List();
            this.collection.bind('add', this.appendItem); // collectionとeventを結合させる

            this.counter = 0;
            this.render();
        },
        render: function() {
            var self = this;
            $(this.el).append("<button id='add'>Add list item</button>");
            $(this.el).append("<ul></ul>");
            _(this.collection.models).each( function(item) { // collectionがから出ない場合
                self.appendItem(item);
            }, this );
        },
        addItem: function () {
            this.counter++ ;
            var item = new Item();
            item.set({
                part2: item.get('part2') + this.counter // defaultsの項目を変更する
            });
            this.collection.add(item);
        },

        appendItem: function(item) {
            var itemView = new ItemView({
                model: item
            });
            $('ul', this.el).append(itemView.render().el);
        }
    });

    var listView = new ListView();
}) (jQuery);
