let whitelist, blacklist, urla, urlb;
chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    url = tabs[0].url;
});
console.log("bsjidjais");
chrome.storage.sync.get(whitelist, (i) => {
    whitelist = i.whitelist;
});
chrome.storage.sync.get(blacklist, (i) => {
    blacklist = i.blacklist;
});
const btn1 = document.querySelector("#btn-1");
const btn2 = document.querySelector("#btn-2");
const container = document.querySelector(".container");
btn1.addEventListener("click", () => {
    console.log("btn1 clicked");
    for (let i = 0; i < blacklist.length; i++) {
        if (blacklist[i] == url) {
            urla = true;
        }
    }
    if (!urla) {
        blacklist.push(url);
        console.log("uwu1");
    }
    chrome.storage.sync.set({
        whitelist: whitelist,
        blacklist: blacklist
    });
    urla = false;
});

btn2.addEventListener("click", () => {
    console.log("btn2 clicked");
    for (let i = 0; i < whitelist.length; i++) {
        if (whitelist[i] === url) {
            urlb = true;
        }
    }
    for (let i = 0; i < blacklist.length; i++) {
        if (blacklist[i] === url) {
            urla = true;
        }
    }
    if (!urlb) {
        whitelist.push(url);
        console.log("uwu2")
    }
    if (urla) {
        delete blacklist[blacklist.indexOf(url)];
        console.log("uwu3")
    }
    chrome.storage.sync.set({
        whitelist: whitelist,
        blacklist: blacklist
    });
    urla = false;
    urlb = false;
});