
// TODO: upload image as such instead of url 
// read the latest time from database



 var config = {
    apiKey: "AIzaSyA29-7KAZWoHRkAndJKj4yq-i2h2UsKYWg",
    authDomain: "schedule-c07db.firebaseapp.com",
    databaseURL: "https://schedule-c07db.firebaseio.com",
    projectId: "schedule-c07db",
    storageBucket: "schedule-c07db.appspot.com",
    messagingSenderId: "997485096643"
  };
  firebase.initializeApp(config);
    var database = firebase.database();
    var interval = 30*60;

    function getScheduledTime(callback) {
       readData(
            function(prevTime) {
                console.log(prevTime);
                var nextTime = prevTime + interval;
                nextTime = getCorrectedTime(nextTime);
                writeData(nextTime);
                callback(nextTime);
            }
        );
    }

// 12:01 am to 6:00 am : we are not posting anything.
    function getCorrectedTime(nextTime){
        var d = new Date(nextTime*1000);
        // var m = d.getMinutes();
        // var h = d.getHours();
        // if(h<6) {
        //     h = 6; m=0;
        // }
        // d.setHours(h);
        // d.setMinutes(m);

        // set d as the current date + 30 minutes in case current Time is greater than write time
        if(d.getTime() < Date.now()){
            d = new Date(Date.now() + interval*1000);
        }
        return Math.floor(d.getTime()/1000);
    }

  function readData(callback) {
   database.ref('/schedule/').once('value').then(function(snapshot){
    callback(snapshot.val());
   });
  }

  function writeData(value) {
    var obj = {
        'schedule' : value
    }
    database.ref('/').update(obj);
    console.log('written next time '+ value);
  }

 var schedulePost = function(image){
     console.log(image.srcUrl);
     var success = function(){
        console.log("successfully posted");
    }
    var error = function() {
        readData(
            function(prevTime) {
                console.log(prevTime);
                var nextTime = prevTime - interval;
                nextTime = getCorrectedTime(nextTime);
                writeData(nextTime);
            }
        );
    }
    // var pageId = 1884816475065657;
    var pageId = 119554311935735; // prod
    var baseDomain = "https://graph.facebook.com";
    // var pageAccessToken = "EAAEw28ggKzcBAEQFUt6qvii3IDHEZA2G1WtMlDJEDEM11BqhbbwgOEz3hgAPwnGkZCZAuEquDVpdZB9f5Sk4xgAVeiv4RN9h2XFBNP5FniqvOjB3bId0Pt53eYbwM9aBm3GUQb5EJZCzfiEHAq3mGxZBP2OUJZCp380lPtO7mQdhgZDZD";
    var pageAccessToken = "EAACEdEose0cBAMKVky2Tz3zUwXTAvStPc30zMQxf8VlUD57RY2yCBgrM3BWWhhbDI0T1FvJVwk5oP7lN1vxnZBvb9nMPOEljgObfKhArCTmSDoGgYOZCqv4bZCyiIqUjSYyqvixhntE9pyzCIGG4mkisSj4rTHZB8bGILjFhOXb4sOOSsRX9Mx7LBNttY61rFZCMB3UC7f2VsAjymGMr4"; // prod
    var url = baseDomain+"/"+pageId+"/photos?access_token="+pageAccessToken;
    getScheduledTime(function(scheduledTime){
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
        error: error,
        dataType: "json"
    });
    });
 };

chrome.contextMenus.create({
 title: "Schedule post",
 contexts:["image"],  // ContextType.. video context menu is somehow fucking up.. mostly because fb is overriding it
 onclick: schedulePost // A callback function
});