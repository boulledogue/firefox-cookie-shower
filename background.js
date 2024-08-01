// background.js

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "updateBadge") {
        updateBadge(sender.tab);
    }
});

function updateBadge(tab) {
    chrome.storage.local.get('cookieName', function(data) {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
        } else {
            var cookieName = data.cookieName || 'SERVERID';  // Nom du cookie par défaut
            console.log('Nom du cookie récupéré : ' + cookieName);

            var url = new URL(tab.url);
            var domain = url.hostname;

            // Trying to get the cookie for both HTTP and HTTPS protocols
            chrome.cookies.get({ url: 'http://' + domain, name: cookieName }, function(cookie) {
                if (cookie) {
                    setBadgeText(cookie.value);
                } else {
                    // If the cookie is not found under HTTP, try HTTPS
                    chrome.cookies.get({ url: 'https://' + domain, name: cookieName }, function(cookie) {
                        if (cookie) {
                            setBadgeText(cookie.value);
                        } else {
                            setBadgeText('');
                        }
                    });
                }
            });
        }
    });
}

// Function to set the badge text
function setBadgeText(text) {
    // Get the first few characters of the cookie value
    var badgeText = text.substring(0, 4);  // Adjust the number of characters as needed
    chrome.browserAction.setBadgeText({ text: badgeText });
    chrome.browserAction.setBadgeBackgroundColor({ color: '#4688F1' });  // Optional: Set badge background color
}
