chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === 'execScript') {
    sendResponse({message: 'running script'});

    var $ = jQuery;

    $(document).ready(function () {
      var count = 0;

      var getIframe = function (cb) {
        var iFrame = $('#playerContainer')[0];

        if (iFrame) {
          cb(iFrame);
        } else {
          count ++;

          if (count < 3) {
            setTimeout(function () {
              getIframe(cb);
            }, 200);
          } else {
            console.log('iframe not found with id \'playerContainer\'.');
            console.log('Returning...');
          }
        }
      };

      getIframe(function (iFrame) {
        if (!iFrame.contentWindow) {
          console.log('iframe has no property \'contentWindow\'.', iFrame);
          console.log('Returning...');
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
          // haven't succeeded with this one yet...iframe is being a bitch
        };

        var search = function (_, query) {
          sendMessage('Search(["' + query.trim() + '"])');
        };

        console.log('Voice Control Activated...');

        annyang.addCommands({
          'play': play,
          'start': play,
          'pause': pause,
          'paws': pause,
          'stop': pause,
          'back': back,
          'search': {
            'regexp': /^(search for) (.*)/,
            'callback': search
          }
        });

        annyang.start({ autoRestart: true });
      });

    });
  }
});
