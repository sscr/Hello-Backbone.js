(function($) {

    var ListView = Backbone.View.extend({
        el: $('body'), // attaches 'this.el' to an existing element.

        initialize: function() {
            _.bindAll(this, 'render'); // fixes loss of content for 'this' within methods

            this.render(); // not all views are self-rendering. This one is.
        },

        render: function() {
            $(this.el).append("<ul><li>hello world</li></ul>");
        }
    });

    var listView = new ListView();
}) (jQuery);

// (1) line:17でListViewをインスタンス化 => 実行
// (2) line:6でListViewのinitialize実行
// (3) line:9でline:12のrender呼び出し
// line:3でelはbodyと定義されている為、body内に<ul><li>hello world</li></ul>がappend(追加)される
