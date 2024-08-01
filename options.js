// options.js

document.addEventListener('DOMContentLoaded', function() {
    // Récupérer et afficher le nom du cookie actuel
    chrome.storage.local.get('cookieName', function(data) {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
        } else {
            console.log('Données récupérées : ', data);
            if (data.cookieName) {
                document.getElementById('cookieName').value = data.cookieName;
            }
        }
    });

    // Sauvegarder le nom du cookie
    document.getElementById('save').addEventListener('click', function() {
        var cookieName = document.getElementById('cookieName').value;
        chrome.storage.local.set({cookieName: cookieName}, function() {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
            } else {
                console.log('Nom du cookie sauvegardé : ' + cookieName);
            }
        });
    });
});
