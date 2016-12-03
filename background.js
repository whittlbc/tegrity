chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	if (changeInfo.status === 'complete') {
	  chrome.tabs.get(tabId, function(tab){
			if (tab.url.startsWith('https://louisville.tegrity.com/#/recording')) {
			  chrome.tabs.sendMessage(tabId, { message: 'execScript' }, function(){});
			}
	  });
	}
});