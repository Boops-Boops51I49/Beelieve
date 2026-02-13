browser.runtime.onMessage.addListener((message, sender) => {
  if (message.action === "closeTab") {
    if (sender.tab && sender.tab.id) {
      browser.tabs.remove(sender.tab.id);
    }
  }
});
