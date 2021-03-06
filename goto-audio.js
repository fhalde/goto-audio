'use strict';

var last;
chrome.browserAction.onClicked.addListener(function(curr) {
    chrome.tabs.query({}, tabs => {
        var count = 0;
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i].audible) {
                count++;
            }
        }

        if (count === 0) {
            last = undefined;
        }

        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i].audible && (count === 1 || last !== tabs[i].id)) {
                chrome.windows.update(tabs[i].windowId, {
                  focused: true
                });
                chrome.tabs.update(tabs[i].id, {
                  active: true
                });
                last = tabs[i].id;
                break;
            }
        }
    });
});
