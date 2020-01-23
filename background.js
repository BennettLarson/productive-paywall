chrome.runtime.onInstalled.addListener(function() {
  let blockedURLS = ["https://stackoverflow.com"];

    chrome.storage.sync.set({color: '#3aa757'}, function() {
      console.log("The color is green.");
    });

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'developer.chrome.com'},
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });

    chrome.webRequest.onBeforeRequest.addListener(
      function(details) {
           return {redirectUrl: 'chrome-extension://' + chrome.runtime.id + '/options.html'};
      },
      {
          urls: [
              "*://piratebay.se/*",
              "*://www.piratebay.se/*"
          ],
          types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
      },
      ["blocking"]
  );

    // chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    //   if (changeInfo.status === 'complete') {
    //     chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    //       console.log('tab url:' + tabs[0].url);
    //       if (tabs[0].url.includes(blockedURLS[0])) {
    //         console.log('BLOCKED!');
    //         chrome.tabs.create({
    //           url: 'chrome-extension:/' + chrome.runtime.id + '/options.html'
    //         });
    //       }
    //     });
    //     console.log('updated from background');
    //     console.log(changeInfo);
    //     console.log(tab);
    //   }
    // });

  });