define(
  'tinymce.themes.mobile.util.FormatChangers',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Obj',
    'ephox.sugar.api.node.Element',
    'ephox.sugar.api.node.Node',
    'tinymce.themes.mobile.channels.TinyChannels'
  ],

  function (Arr, Fun, Obj, Element, Node, TinyChannels) {
    var fontSizes = [ 'x-small', 'small', 'medium', 'large', 'x-large' ];

    var fireChange = function (realm, command, state) {
      realm.system().broadcastOn([ TinyChannels.formatChanged() ], {
        command: command,
        state: state
      });
    };

    var init = function (realm, editor) {
      var allFormats = Obj.keys(editor.formatter.get());
      Arr.each(allFormats, function (command) {
        editor.formatter.formatChanged(command, function (state) {
          fireChange(realm, command, state);
        });
      });

      editor.selection.selectorChanged('ol,ul', function (state, data) {
        var elem = Element.fromDom(data.node);
        var messages = state === false ? [
          { command: 'ol', state: false },
          { command: 'ul', state: false }
        ] : [
          { command: 'ol', state: Node.name(elem) === 'ol' },
          { command: 'ul', state: Node.name(elem) === 'ul' }
        ];

        Arr.each(messages, function (message) {
          realm.system().broadcastOn([ TinyChannels.formatChanged() ], message);
        });
      });
    };

    return {
      init: init,
      fontSizes: Fun.constant(fontSizes)
    };
  }
);
