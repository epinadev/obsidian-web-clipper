chrome.commands.onCommand.addListener(function(command) {
  if (command === "open-popup") {
    showModal()
  }
});
