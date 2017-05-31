

 var schedulePost = function(image){
     console.log(image.srcUrl);
     var success = function(){
        console.log("successfully posted");
    }
    var pageId = 1884816475065657;
    var baseDomain = "https://graph.facebook.com";
    var pageAccessToken = "EAAEw28ggKzcBAEQFUt6qvii3IDHEZA2G1WtMlDJEDEM11BqhbbwgOEz3hgAPwnGkZCZAuEquDVpdZB9f5Sk4xgAVeiv4RN9h2XFBNP5FniqvOjB3bId0Pt53eYbwM9aBm3GUQb5EJZCzfiEHAq3mGxZBP2OUJZCp380lPtO7mQdhgZDZD";
    var url = baseDomain+"/"+pageId+"/photos?access_token="+pageAccessToken;
    var data = {
        "message": "test post 4",
        "page_access_token": pageAccessToken,
        "url": image.srcUrl, 
    };
    var urlSanitized = encodeURIComponent(url);
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
 contexts:["all"],  // ContextType.. video context menu is somehow fucking up.. mostly because fb is overriding it
 onclick: schedulePost // A callback function
});