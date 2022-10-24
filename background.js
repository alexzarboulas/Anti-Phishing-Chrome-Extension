importScripts('whitelist.js');
console.log('background running')

var url;


chrome.tabs.onActivated.addListener( function(activeInfo){
    chrome.tabs.get(activeInfo.tabId, function(tab){
        
        y = convert(tab.url);
        
        chrome.history.search({
            'text': y            
          },
          function(historyItems) {
            var item = historyItems;

          });

    });
});



chrome.tabs.onUpdated.addListener((tabId, change, tab) => {


    var keepGoing = 0;
    var keepGoing2 = 1;

    if (tab.active && change.status == 'complete') {

        y = convert(tab.url);
        url = y;


        const ident = tabId;
        if((keepGoing + 1) == keepGoing2) {
        chrome.scripting.executeScript(
        {
        target: {tabId: ident},
        files: ['content.js'],
        })
        keepGoing2 = -10;
        }

        
    }
    
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log('this page has inputs');
        
        chrome.history.search({
            'text': url
        },
        function(historyItems) {
            var item = historyItems;
            check(item, y);
        })
    }
);




function convert(url) { 

    url = url.replace("https://", "");
    url = url.replace("http://", "");
    url = url.replace("www.", "");
    url = url.substr(0, url.indexOf("/"));
    return url;
}

function check(items, url) {




    if((items.length <= 1  && sites.indexOf(y) < 0 && url !== null && url !== "chrome:" && url !== "chrome-extension:") || url === "twitch.tv")
        {
            sites.push(url);
            console.log('you have never visited this website ' + url);
            
        }
}



