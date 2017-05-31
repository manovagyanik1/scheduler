
// TODO: upload image as such instead of url 
// read the latest time from database

function getScheduledTime() {
    var d = new Date();
    return Math.round(d.getTime() / 1000) + 700;
}

 var schedulePost = function(image){
     console.log(image.srcUrl);
     var success = function(){
        console.log("successfully posted");
    }
    var pageId = 1884816475065657;
    var baseDomain = "https://graph.facebook.com";
    var pageAccessToken = "EAAEw28ggKzcBAEQFUt6qvii3IDHEZA2G1WtMlDJEDEM11BqhbbwgOEz3hgAPwnGkZCZAuEquDVpdZB9f5Sk4xgAVeiv4RN9h2XFBNP5FniqvOjB3bId0Pt53eYbwM9aBm3GUQb5EJZCzfiEHAq3mGxZBP2OUJZCp380lPtO7mQdhgZDZD";
    var url = baseDomain+"/"+pageId+"/photos?access_token="+pageAccessToken;
    var scheduledTime = getScheduledTime();
    var data = {
        "page_access_token": pageAccessToken,
        "url": image.srcUrl, 
        "scheduled_publish_time": scheduledTime,
        "published": false
    };
    $.ajax({
    type: "POST",
    url: url,
    data: data,
    success: success,
    dataType: "json"
    });
 };

chrome.contextMenus.create({
 title: "Schedule post",
 contexts:["image"],  // ContextType.. video context menu is somehow fucking up.. mostly because fb is overriding it
 onclick: schedulePost // A callback function
});