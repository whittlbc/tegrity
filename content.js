chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === 'execScript') {
    sendResponse({message: 'running script'});

    var $ = jQuery;

    $(document).ready(function () {
      var iFrame = $('#playerContainer')[0];

      if (!iFrame) {
        console.log('iframe not found with id \'playerContainer\'. Returning.');
        return;
      }

      if (!iFrame.contentWindow) {
        console.log('iframe has no property \'contentWindow\'.', iFrame);
        return;
      }

      var sendMessage = function (fn) {
        if (fn.indexOf('(') == -1) {
          fn += '()';
        }

        iFrame.contentWindow.postMessage(fn, '*');
      };

      var play = function () {
        sendMessage('Play');
      };

      var pause = function () {
        sendMessage('Pause');
      };

      var back = function () {
      };

      var search = function (_, query) {
        console.log('Searching for ' + query + '...');
        sendMessage('Search(["' + query.trim() + '"])');
      };

      console.log('Voice Control Activated...');

      annyang.addCallback('result', function(phrases) {
        console.log(phrases);
      });

      annyang.addCommands({
        'play': play,
        'pause': pause,
        'paws': pause,
        'start': play,
        'stop': pause,
        'back': back,
        'search': {
          'regexp': /^(search for) (.*)/,
          'callback': search
        }
      });

      annyang.start({ autoRestart: true });
    });
  }
});
