chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({hiddenTiles: []}, function() {
  
  });
});

