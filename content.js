function isPlaying () {
  return $('#PauseButton').css('visibility') == 'visible';
}

function togglePlayback () {
  $('#ScreenAVPlayer').click();
}

function play () {
  if (!isPlaying()) {
    togglePlayback();
  }
}

function pause () {
  if (isPlaying()) {
    togglePlayback();
  }
}

function back () {
  if (isPlaying()) {
    $('#Back30').click();
  }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === 'execScript') {
    sendResponse({message: 'running script'});

    if (annyang) {
      console.log('Voice Control Activated...');

      annyang.addCommands({
        'play': play,
        'pause': pause,
        'start': play,
        'stop': pause,
        'back': back
      });

      annyang.start({ autoRestart: true });
    } else {
      console.log('annyang not defined...');
    }
  }
});
