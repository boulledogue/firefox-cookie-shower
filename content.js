// content.js

// Send a message to the background script to update the badge
chrome.runtime.sendMessage({action: "updateBadge"});
