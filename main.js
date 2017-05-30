 var searchUrbanDict = function(word){
    var query = word.selectionText;
    chrome.tabs.create({url: "http://www.urbandictionary.com/define.php?term=" + query});
 };

chrome.contextMenus.create({
 title: "Schedule post",
 contexts:["all"],  // ContextType
 onclick: searchUrbanDict // A callback function
});