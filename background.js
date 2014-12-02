chrome.app.runtime.onLaunched.addListener(function(launchData) {
  chrome.app.window.create('app.html', {
    width: 1024,
    height: 720,
    minWidth: 1024,
    minHeight: 720
  });
});
