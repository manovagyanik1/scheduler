 var schedulePost = function(word){
    var query = word.selectionText;
    chrome.tabs.create({url: "http://www.urbandictionary.com/define.php?term=" + query});
 };

chrome.contextMenus.create({
 title: "Schedule post",
 contexts:["image", "video"],  // ContextType.. video context menu is somehow fucking up.. mostly because fb is overriding it
 onclick: schedulePost // A callback function
});