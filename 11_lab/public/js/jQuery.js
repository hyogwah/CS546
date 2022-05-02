(function ($) {
  var show = $("#show"),
    showList = $("#showList"),
    homeLink = $("#homeLink"),
    searchForm = $("#searchForm"),
    requestConfig = {
      method: "GET",
      url: "http://api.tvmaze.com/shows",
    };

  $.ajax(requestConfig).then(function (responseMessage) {
    //console.log(responseMessage);
    for (let i = 0; i < responseMessage.length; i++) {
      showList.append(
        $("<li>").append(
          $("<a>")
            .attr("href", responseMessage[i]._links.self.href)
            .text(responseMessage[i].name)
        )
      );
    }
    show.hide();
    homeLink.hide();
    showList.show();
  });

  searchForm.submit(function (event) {
    event.preventDefault();
    let input = $("#search_term").val().trim();
    if (!input) {
      $("#error").show();
    } else {
      $("#error").hide();
      showList.empty();

      var requestConfig = {
        method: "GET",
        url: "http://api.tvmaze.com/search/shows?q=" + input,
      };

      $.ajax(requestConfig).then(function (responseMessage) {
        if (responseMessage.length == 0) {
          $("#no_results").show();
        } else {
          $("#no_results").hide();
          for (let i = 0; i < responseMessage.length; i++) {
            showList.append(
              $("<li>").append(
                $("<a>")
                  .attr("href", responseMessage[i].show._links.self.href)
                  .text(responseMessage[i].show.name)
              )
            );
          }
        }
        showList.show();
        show.hide();
        homeLink.show();
      });
    }
  });

  showList.click(function (event) {
    event.preventDefault();
    showList.hide();
    show.empty();
    $("#error").hide();
    $("#no_results").hide();

    var requestConfig = {
      method: "GET",
      url: event.target.href,
    };

    $.ajax(requestConfig).then(function (responseMessage) {
      if (responseMessage.name) {
        show.append($("<h1>").text(responseMessage.name));
      } else {
        show.append($("<h1>").text("N/A"));
      }

      if (responseMessage.image) {
        show.append($("<img>").attr("src", responseMessage.image.medium));
      } else {
        show.append($("<img>").attr("src", "/public/img/download.jpeg"));
      }

      show.append("<dl></dl>");
      var dl = $("#show dl");

      dl.append($("<dt>").text("Language"));
      if (responseMessage.language) {
        dl.append($("<dd>").text(responseMessage.language));
      } else {
        dl.append($("<dd>").text("N/A"));
      }
      dl.append($("<dt>").text("Genres"));
      if (responseMessage.genres) {
        dl.append($("<dd>").append($("<ul>").attr("id", "genres")));
        let numShows = responseMessage.genres.length;
        for (let i = 0; i < numShows; i++) {
          $("#show dl #genres").append(
            "<li>" + responseMessage.genres[i] + "</li>"
          );
        }
      } else {
        dl.append($("<dd>").text("N/A"));
      }
      dl.append($("<dt>").text("Average Rating"));
      if (responseMessage.rating.average) {
        dl.append($("<dd>").text(responseMessage.rating.average));
      } else {
        dl.append($("<dd>").text("N/A"));
      }
      dl.append($("<dt>").text("Network"));
      if (responseMessage.network) {
        dl.append($("<dd>").text(responseMessage.network.name));
      } else {
        dl.append($("<dd>").text("N/A"));
      }
      dl.append($("<dt>").text("Summary"));
      if (responseMessage.summary) {
        var summaryStripped = $(responseMessage.summary).text();
        dl.append($("<dd>").text(summaryStripped));
      } else {
        dl.append($("<dd>").text("N/A"));
      }
      show.show();
      homeLink.show();
    });
  });
})(window.jQuery);
