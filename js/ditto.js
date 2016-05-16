$(function($) {

  var ditto = {
    content_id: $("#content"),
    sidebar_id: $("#sidebar"),

    edit_id: $("#edit"),
    back_to_top_id: $("#back_to_top"),

    loading_id: $("#loading"),
    error_id: $("#error"),

    search_name: $("#search"),
    search_results_class: ".search_results",
    fragments_class: ".fragments",
    fragment_class: ".fragment",

    highlight_code: true,

    // display elements
    sidebar: true,
    edit_button: true,
    back_to_top_button: true,
    searchbar: true,

    // github specifics
    github_username: null,
    github_repo: null,

    // initialize function
    run: initialize
  };

  function initialize() {
    // initialize sidebar and buttons
    if (ditto.sidebar) {
      init_sidebar_section();
    }

    if (ditto.back_to_top_button) {
      init_back_to_top_button();
    }

    if (ditto.edit_button) {
      init_edit_button();
    }

    // intialize highligh.js
    if (ditto.highlight_code) {
      hljs.initHighlightingOnLoad();
    }

    // page router
    router();
    $(window).on('hashchange', router);
  }

  function init_sidebar_section() {
    $.get(ditto.sidebar_file, function(data) {
      ditto.sidebar_id.html(marked(data));

      if (ditto.searchbar) {
        init_searchbar();
      }

    }, "text").fail(function() {
      alert("Opps! can't find the sidebar file to display!");
    });

  }

  function init_back_to_top_button() {
    ditto.back_to_top_id.show();
    ditto.back_to_top_id.on("click", function() {
      $("body, html").animate({
        scrollTop: 0
      }, 200);
    });
  }

  function init_edit_button() {
    if (ditto.base_url === null) {
      alert("Error! You didn't set 'base_url' when calling ditto.run()!");

    } else {
      ditto.edit_id.show();
      ditto.edit_id.on("click", function() {
        var hash = location.hash.replace("#", "/");

        if (hash === "") {
          hash = "/" + ditto.index.replace(".md", "");
        }

        window.open(ditto.base_url + hash + ".md");
        // open is better than redirecting, as the previous page history
        // with redirect is a bit messed up
      });
    }
  }

  function init_searchbar() {
    var sidebar = ditto.sidebar_id.html();
    var match = "[ditto:searchbar]";

    // html input searchbar
    var search = "<input name='" + ditto.search_name.selector + "'";
    search = search + " type='search'";
    search = search + " results='10'>";

    // replace match code with a real html input search bar
    sidebar = sidebar.replace(match, search);
    ditto.sidebar_id.html(sidebar);

    // add search listener
    $("input[name=" + ditto.search_name.selector + "]").keydown(searchbar_listener);
  }

  function build_text_matches_html(fragments) {
    var html = "";
    var class_name = ditto.fragments_class.replace(".", "");

    html += "<ul class='" + class_name + "'>";
    for (var i = 0; i < fragments.length; i++) {
      var fragment = fragments[i].fragment.replace("/[\uE000-\uF8FF]/g", "");
      html += "<li class='" + ditto.fragment_class.replace(".", "") + "'>";
      html += "<pre><code> ";
      fragment = $("#hide").text(fragment).html();
      html += fragment;
      html += " </code></pre></li>";
    }
    html += "</ul>";

    return html;
  }

  function build_result_matches_html(matches) {
    var html = "";
    var class_name = ditto.search_results_class.replace(".", "");

    html += "<ul class='" + class_name + "'>";
    for (var i = 0; i < matches.length; i++) {
      var url = matches[i].path;

      if (url !== ditto.sidebar_file) {
        var hash = "#" + url.replace(".md", "");
        var path = window.location.origin+ "/" + hash;

        // html += "<li>";
        html += "<li class='link'>";
        html += url;
        // html += "<a href='" + path +"'>" + url + "</a>";
        html += "</li>";

        var match = build_text_matches_html(matches[i].text_matches);
        html += match;
      }

    }
    html += "</ul>";

    return html;
  }

  function display_search_results(data) {
    var results_html = "<h1>Search Results</h1>";

    if (data.items.length) {
      hide_errors();
      results_html += build_result_matches_html(data.items);
    } else {
      show_error("Opps.. Found no matches!");
    }

    ditto.content_id.html(results_html);
    $(ditto.search_results_class + " .link").click(function(){
      var destination = "#" + $(this).html().replace(".md", "");
      location.hash = destination;
    });
  }

  function github_search(query) {
    if (ditto.github_username && ditto.github_repo) {
      // build github search api url string
      var github_api = "https://api.github.com/";
      var search = "search/code?q=";
      var github_repo = ditto.github_username + "/" + ditto.github_repo;
      var search_details = "+in:file+language:markdown+repo:";

      var url = github_api + search + query + search_details + github_repo;
      var accept_header = "application/vnd.github.v3.text-match+json";

      $.ajax(url, {headers: {Accept: accept_header}}).done(function(data) {
        display_search_results(data);
      });
    }

    if (ditto.github_username == null && ditto.github_repo == null) {
      alert("You have not set ditto.github_username and ditto.github_repo!");
    } else if (ditto.github_username == null) {
      alert("You have not set ditto.github_username!");
    } else if (ditto.github_repo == null) {
      alert("You have not set ditto.github_repo!");
    }
  }

  function searchbar_listener(event) {
    if (event.which === 13) {  // when user presses ENTER in search bar
      var q = $("input[name=" + ditto.search_name.selector + "]").val();
      if (q !== "") {
        location.hash = "#search=" + q;
      } else {
        alert("Error! Empty search query!");
      }
    }
  }

  function replace_symbols(text) {
    // replace symbols with underscore
    return text.replace(/[&\/\\#,+=()$~%.'":*?<>{}\ \]\[]/g, "_");
  }

  function li_create_linkage(li_tag, header_level) {
    // add custom id and class attributes
    html_safe_tag = replace_symbols(li_tag.text());
    li_tag.attr("id", html_safe_tag);
    li_tag.attr("class", "link");

    // add click listener - on click scroll to relevant header section
    $(ditto.content_id.selector + " li#" + li_tag.attr("id")).click(function() {
      // scroll to relevant section
      var header = $("h" + header_level + "." + li_tag.attr("id"));
      $('html, body').animate({
        scrollTop: header.offset().top
      }, 200);

      // highlight the relevant section
      original_color = header.css("color");
      header.animate({ color: "#ED1C24", }, 500, function() {
        // revert back to orig color
        $(this).animate({color: original_color}, 2500);
      });
    });
  }

  function create_page_anchors() {
    // create page anchors by matching li's to headers
    // if there is a match, create click listeners
    // and scroll to relevant sections

    // go through header level 2 and 3
    for (var i = 2; i <= 4; i++) {
      // parse all headers
      var headers = [];
      $(ditto.content_id.selector + ' h' + i).map(function() {
        headers.push($(this).text());
        $(this).addClass(replace_symbols($(this).text()));
      });

      // parse and set links between li and h2
      $(ditto.content_id.selector + ' ul li').map(function() {
        for (var j = 0; j < headers.length; j++) {
          if (headers[j] === $(this).text()) {
            li_create_linkage($(this), i);
          }
        }
      });
    }
  }

  function normalize_paths() {
    // images
    ditto.content_id.find("img").map(function() {
      var src = $(this).attr("src").replace(/^\.\//, "");
      if ($(this).attr("src").slice(0, 5) !== "http") {
        var url = location.hash.replace("#", "");

        // split and extract base dir
        url = url.split("/");
        var base_dir = url.slice(0, url.length - 1).join("/");

        // normalize the path (i.e. make it absolute)
        if (base_dir) {
          $(this).attr("src", base_dir + "/" + src);
        } else {
          $(this).attr("src", src);
        }
      }
    });

  }

  function show_error(err_msg) {
    ditto.error_id.html(err_msg);
    ditto.error_id.show();
  }

  function hide_errors() {
    ditto.error_id.hide();
  }

  function show_loading() {
    ditto.loading_id.show();
    ditto.content_id.html("");  // clear content

    // infinite loop until clearInterval() is called on loading
    ditto.loading_interval = setInterval(function() {
      ditto.loading_id.fadeIn(1000).fadeOut(1000);
    }, 2000);

  }

  function stop_loading() {
    clearInterval(ditto.loading_interval);
    ditto.loading_id.hide();
  }

  function escape_github_badges(data) {
    $("img").map(function() {
      var ignore_list = [
        "travis-ci.com",
        "travis-ci.org",
        "coveralls.io"
      ];
      var src = $(this).attr("src");

      var base_url = src.split("/");
      var protocol = base_url[0];
      var host = base_url[2];

      if ($.inArray(host, ignore_list) >= 0) {
        $(this).attr("class", "github_badges");
      }
    });
    return data;
  }

  function page_getter() {
    window.scrollTo(0, 0);
    var path = location.hash.replace("#", "./");

    // default page if hash is empty
    var current_page = location.pathname.split("/").pop();
    if (current_page === "index.html") {
      path = location.pathname.replace("index.html", ditto.index);
      normalize_paths();

    } else if (path === "") {
      path = window.location + ditto.index;
      normalize_paths();

    } else {
      path = path + ".md";

    }

    // otherwise get the markdown and render it
    show_loading();
    $.get(path, function(data) {
      compile_into_dom(path, data, function() {
        // rerender mathjax and reset mathjax equation counter
        if (MathJax) {
          MathJax.Extension["TeX/AMSmath"].startNumber = 0;
          MathJax.Extension["TeX/AMSmath"].labels = {};

          var content = document.getElementById("content");
          MathJax.Hub.Queue(["Typeset", MathJax.Hub, content]);
        }
      });
    }).fail(function() {
      show_error("Opps! ... File not found!");
      stop_loading();
    });
  }

  function escape_html(string) {
    return string
      .replace(/\\/g, "&#92;")
      .replace(/\_/g, "&#95;");
  }

  function unescape_html(string) {
    return string
      .replace(/&amp;#92;/g, "\\")
      .replace(/&amp;#95;/g, "_");
  }

  function compile_into_dom(path, data, cb) {
    hide_errors();

    data = marked(escape_html(data));
    data = unescape_html(data);
    ditto.content_id.html(data);

    stop_loading();
    escape_github_badges(data);

    normalize_paths();
    create_page_anchors();

    if (ditto.highlight_code) {
      $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
      });
    }

    if (cb) {
      cb(data);
    }
  }

  function router() {
    var hash = location.hash;

    if (hash.slice(1, 7) !== "search") {
      page_getter();

    } else {
      if (ditto.searchbar) {
        github_search(hash.replace("#search=", ""));
      }

    }
  }

  window.ditto = ditto;
});
