let whitelist, blacklist, x, url, id;
try {
    chrome.storage.sync.get(["whitelist"], (a) => {
        whitelist = a.whitelist;
    });
    console.log(a.whitelist.length);
} catch (exception) {
    whitelist = ["cusd", "infinitecampus", "slides.google.com", "khanacademy.org", "brainpop.com", "bim.easyaccessmaterials", 
    "code.org", "w3schools", "wikipedia.org", "stackoverflow", "clever.com", "quizlet.com", "blooket", "quizz", "kahoot.it", 
    "scratch.mit.edu", "gimkit", ".edu", ".gov", "google.com"]; 
    x = exception;
}
try {
    chrome.storage.sync.get(["blacklist"], (a) => {
        blacklist = a.blacklist;
    });
    console.log(a.blacklist.length);
} catch {
    blacklist = ["scratch.mit.edu"];
}
console.log(whitelist);
console.log(blacklist);
chrome.storage.sync.set({
    whitelist: whitelist,
    blacklist: blacklist
})

const onActivation = (tabId, tab) => {
    const start = Date.now();
    console.log(tab);
    console.log(tab.url);
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        url = tabs[0].url;
    })
    id = tabId;
    for (let i = l = 0; i < whitelist.length; i++) {
        if (url && (url.toString().includes(whitelist[i]) && !(url.toString().includes(blacklist[i < blacklist.length ? i : blacklist.length - 1])))) {
            chrome.tabs.sendMessage(tabId, {
                block: false,
                url: url,
                whitelist: whitelist,
                blacklist: blacklist,
                t: start,
                id: tabId,
                x: x
            })
        } else if (url && (url.toString().includes(blacklist[i < blacklist.length ? i : blacklist.length - 1]))) {
            chrome.tabs.sendMessage(tabId, {
                block: true,
                url: url,
                whitelist: whitelist,
                blacklist: blacklist,
                t: start,
                id: tabId,
                x: x
            })
        } else {
            l++
        }
        if (l == whitelist.length) {
            chrome.tabs.sendMessage(tabId, {
                block: true,
                url: url,
                whitelist: whitelist,
                blacklist: blacklist,
                t: start,
                id: tabId,
                x: x
            })
        }
    }
}
chrome.tabs.onUpdated.addListener(onActivation);
chrome.storage.onChanged.addListener((changes, namespace) => {
    const start = Date.now();
    // chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    //     id = tabs[0].id;
    //     console.log(tabs[0].id);
    // });
    console.log("changes: " + changes);
    try {
        blacklist = changes.blacklist.newValue;
        console.log(`changed blacklist: ${blacklist}`);
    } catch (error) {
        console.log(`blacklist error: ${error}`);
    }
    try {
        whitelist = changes.whitelist.newValue;
        console.log(`changed whitelist: ${whitelist}`);
    } catch (error) {
        console.log(`whitelist error: ${error}`);
    }
    
    console.log("namespace: " + namespace);
    chrome.storage.sync.get(["whitelist"], (a) => {
        whitelist = a.whitelist;
        console.log(a.whitelist);
    });
    chrome.storage.sync.get(["blacklist"], (a) => {
        blacklist = a.blacklist;
        console.log(a.blackist);
    });
    for (let i = l = 0; i < whitelist.length; i++) {
        if (url && (url.toString().includes(whitelist[i]) && !(url.toString().includes(blacklist[i < blacklist.length ? i : blacklist.length - 1])))) {
            chrome.tabs.sendMessage(id, {
                block: false,
                url: url,
                whitelist: whitelist,
                blacklist: blacklist,
                t: start,
                id: id,
                x: x
            })
        } else if (url && (url.toString().includes(blacklist[i < blacklist.length ? i : blacklist.length - 1]))) {
            chrome.tabs.sendMessage(id, {
                block: true,
                url: url,
                whitelist: whitelist,
                blacklist: blacklist,
                t: start,
                id: id,
                x: x
            })
        } else {
            l++
        }
        if (l == whitelist.length) {
            chrome.tabs.sendMessage(id, {
                block: true,
                url: url,
                whitelist: whitelist,
                blacklist: blacklist,
                t: start,
                id: id,
                x: x
            })
        }
    }
})
