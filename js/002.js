(function($) {
    var ListView = Backbone.View.extend({
        el: $('body'), // el attaches to existing element

        events: {
            'click button#add': 'addItem'
        },
        initialize: function() {
            _.bindAll(this, 'render', 'addItem'); // every function that uses 'this' as the current object should be in here

            this.counter = 0; // total number of items added this far
            this.render();
        },

        render: function() {
            $(this.el).append("<button id='add'>Add list item</button>");
            $(this.el).append("<ul></ul>");
        },

        addItem: function() {
            this.counter++;
            $('ul', this.el).append("<li>hello world" + this.counter + "</li>");
        }
    });

    var listView = new ListView();
}) (jQuery);

// (1) line:26でListViewをインスタンス化 => 実行
// (2) line:8でListViewのinitialize実行
// (3) line:11でcounterに初期値0を設定
// (4) line:12でline:15のrender呼び出し => DOM生成
// (5) line:5で<button id="add"></button>をクリックするとaddItem(line:20)のイベントを実行と定義
// (6) addItemではクリックする度にcounterの値が1ずつ増加し、また<li>hello world(counterの数値)</li>が<ul></ul>にappend(追加)される
