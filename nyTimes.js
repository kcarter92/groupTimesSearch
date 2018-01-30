$('#search').click(function(event) {
    event.preventDefault();
    var search = {
        "searchTerm" : $('#term-input').val().trim(), 
        "startDate" : $('#startYear-input').val().trim(),
        "endDate" : $('#endYear-input').val().trim(),
        "requestNo" : $('#record-input').val().trim()
    }
    if (search.startDate.length > 0 && search.endDate.length > 0) {
        var queryURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q="+search.searchTerm+"&begin_date="+search.startDate+"&end_date="+search.endDate+"&api-key=7c81bbcfff874e1a97f887297b628f8d";
    }
    else if (search.startDate.length > 0) {
        // 
        var queryURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q="+search.searchTerm+"&begin_date="+search.startDate+"&api-key=7c81bbcfff874e1a97f887297b628f8d"
    }
    else if (search.endDate.length > 0) {
        //
        var queryURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q="+search.searchTerm+"&end_date="+search.endDate+"&api-key=7c81bbcfff874e1a97f887297b628f8d"
    }
    else {  
        var queryURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q="+search.searchTerm+"&api-key=7c81bbcfff874e1a97f887297b628f8d"
    }
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(data) {
        // var anything = JSON.stringify(data.response.docs);
        // $('#articles').append(anything)
        // This constricts the response to the portion we car about. The API returns 10 articles in an array, so we will have to target things by saying result[#].whatever
        console.log(data);
        var result = data.response.docs;
        console.log(result);
        // create a forloop to run the number of artcles that the user requests
        for (i=0; i<10; i++ ) {
            // create a variable = empty div
            // console.log(data.response.docs[i]);
            var article = $('<div>');
            article.addClass('art');
            // append the number of the return using for loop variable to decide the value
            article.append("<span>"+(i+1)+"</span>");
            // append a the title of the article using result[].headline.name (we can also make this a link to the article if we have extra time.) ALSO not every article has a name here. We could note in the for loop that if the name doesn't exist at the location we return an error or ignore the article.)
            if (result[i].headline.main !== null && result[i].headline.main.length > 0) {
                var name = ('<h2>'+result[i].headline.main+'</h2>');
                article.append(name);
            } else if (result[i].headline.name  !== null && result[i].headline.name.length > 0) {
                var name = ('<h2>'+result[i].headline.name+'</h2>');
                article.append(name);
            }
            // append the author's name using result[].
            if (result[i].byline.original !== null && result[i].byline.original.length > 0) {
                var author = ('<p>'+result[i].byline.original+'</p>');
                // author.text(result[i].headline.name);
                article.append(author);
            } else if (result[i].multimedia[0].credit !== null && result[i].multimedia[0].credit.length > 0) {
                var author = ('<p>'+result[i].multimedia[0].credit+'</p>');
                article.append(author);
            }
            // append the variable to the document using $('.articles').append(variable)
            $('#articles').append(article)
        }
    })
})