
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    $wikiElem.text("");
    $nytElem.text("")
    var street = $("#street").val();
    var city = $("#city").val();
    console.log(street,city);
    $nytHeaderElem.text("New York Times Articles about "+city);
    $greeting.text("Welcome to"+city);
    var googStreet = "https://maps.googleapis.com/maps/api/streetview?location="+"%20"+street+",%20"+city+"&size=600x300&key=[YOUR_API_KEY]";
//https://maps.googleapis.com/maps/api/streetview?location=41.403609,2.174448&size=456x456&key=YOUR_API_KEY
    console.log(googStreet);;
    // clear out old data before new request
    var imgTag = "<img class=\"bgimg\" src=\""+googStreet+"\">";
    console.log(imgTag);

//    https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=yourkey
  var nytAPI= "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+city+"&api-key=[YOUR_API_KEY]";
  $.getJSON( nytAPI, function( data ) {
      var items = [];
      var articles = data.response.docs;

        for(i=0; i < articles.length;i++) {
          var article = articles[i];
          var slNo= i+1;
          $nytElem.append('<li class="article">'+ slNo+". "+
          '<a href="'+article.web_url+'">'+article.headline.main+'</a>'+
          '<p>' + article.snippet + '</p>'+ "Date:" + article.pub_date.slice(0,10)+
          '</li>');
        };

  }).error(function() {
    $nytHeaderElem.text("New York Times Articles Not found ");
      $nytElem.text("")
  });



      var apiEndpoint = "https://en.wikipedia.org/w/api.php";
      var params = "action=opensearch&search="+city+"&format=json";
      var scriptTag = document.createElement("script"); // Dynamically create a "script" tag
      scriptTag.src = apiEndpoint + "?" + params + "&callback=wikiCallback"; // Point to the query string



      /**
       * The function to wrap the result
       */
    var wikiTimeout = setTimeout(function(){
        $wikiElem.text("failed to get wikipedia resources");
    }, 8000);

       $.ajax({
          url: scriptTag.src,
          dataType: "jsonp",
          success: function(response){
            for(i=0; i < response.length; i++)
            { slNo = i+1;
              $wikiElem.append('<ul id="wikipedia-links">'+ slNo +'. '+'<a href="'+response[3][i]+'">'+response[1][i]+'</a>'+'</ul>');
            };
          }
        });


clearTimeout(wikiTimeout);

      $wikiElem.text("");


    // load streetview

    // YOUR CODE GOES HERE!
$body.append(imgTag);
    return false;
};

$('#form-container').submit(loadData);

// loadData();
