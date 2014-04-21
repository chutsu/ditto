var ditto = {
    // page elements
    content_id: "#content",
    sidebar_id: "#sidebar",

    edit_id: "#edit",
    back_to_top_id: "#back_to_top",

    loading_id: "#loading",
    error_id: "#error",

    search_name: "#search",
    search_results_class: ".search_results",
    fragments_class: ".fragments",
    fragment_class: ".fragment",

    // display elements
    sidebar: true,
    edit_button: true,
    back_to_top_button: true,
    searchbar: true,

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

    // page router
    router();
    $(window).on('hashchange', router);
}

function init_sidebar_section() {
    $.get(ditto.sidebar_file, function(data) {
        $(ditto.sidebar_id).html(marked(data));

        if (ditto.searchbar) {
            init_searchbar();
        }

    }, "text").fail(function() {
        alert("Opps! can't find the sidebar file to display!");
    });

}

function init_back_to_top_button() {
    $(ditto.back_to_top_id).show();
    $(ditto.back_to_top_id).on("click", function() {
        $("html body").animate({
            scrollTop: 0
        }, 200);
    });
}

function init_edit_button() {
    if (ditto.base_url === null) {
        alert("Error! You didn't set 'base_url' when calling ditto.run()!");

    } else {
        $(ditto.edit_id).show();
        $(ditto.edit_id).on("click", function() {
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
    var sidebar = $(ditto.sidebar_id).html();
    var match = "[ditto:searchbar]";

    // html input searchbar
    var search = "<input name='" + ditto.search_name + "'";
    search = search + " type='search'";
    search = search + " results='10'>";

    // replace match code with a real html input search bar
    sidebar = sidebar.replace(match, search);
    $(ditto.sidebar_id).html(sidebar);

    // add search listener
    $("input[name=" + ditto.search_name + "]").keydown(searchbar_listener);
}

function build_text_matches_html(fragments) {
    var html = "";
    var class_name = ditto.fragments_class.replace(".", "");

    html += "<ul class='" + class_name + "'>";
    for (var i = 0; i < fragments.length; i++) {
        var fragment = fragments[i].fragment.replace("/[\uE000-\uF8FF]/g", "");
        html += "<li class='" + ditto.fragment_class + "'>";
        html += "<pre><code> ";
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
    var results_html = "";
    results_html += "<h1>Search Results</h1>";
    results_html += build_result_matches_html(data.items);
    $(ditto.content_id).html(results_html);
    $(ditto.search_results_class + " .link").click(function(){
        var destination = "#" + $(this).html().replace(".md", "");
        location.hash = destination;
    });
}

function github_search(query) {
    // build github search api url string
    var github_api = "https://api.github.com/";
    var search_api = "search/code?q=";
    var search_details = "+in:file+language:markdown+repo:chutsu/ditto";

    var url = github_api + search_api + query + search_details;
    var accept_header = "application/vnd.github.v3.text-match+json";

    $.ajax(url, {headers: {Accept: accept_header}}).done(function(data) {
        display_search_results(data);
    });
}

function searchbar_listener(event) {
    if (event.which === 13) {  // when user presses ENTER in search bar
        var q = $("input[name=" + ditto.search_name + "]").val();
        location.hash = "#search=" + q;
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
    $(ditto.content_id + " li#" + li_tag.attr("id")).click(function() {
        // scroll to relevant section
        var header = $(
            ditto.content_id + " h" + header_level + "." + li_tag.attr("id")
        );
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
        $(ditto.content_id + ' h' + i).map(function() {
            headers.push($(this).text());
            $(this).addClass(replace_symbols($(this).text()));
        });

        // parse and set links between li and h2
        $(ditto.content_id + ' ul li').map(function() {
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
    $(ditto.content_id + " img").map(function() {
        var src = $(this).attr("src").replace("./", "");
        if ($(this).attr("src").slice(0, 5) !== "http") {
            var url = location.hash.replace("#", "");

            // split and extract base dir
            url = url.split("/");
            var base_dir = url.slice(0, url.length - 1).toString();

            // normalize the path (i.e. make it absolute)
            $(this).attr("src", base_dir + "/" + src);
        }
    });

}

function show_error() {
    console.log("SHOW ERORR!");
    $(ditto.error_id).show();
}

function show_loading() {
    $(ditto.loading_id).show();
    $(ditto.content_id).html("");  // clear content

    // infinite loop until clearInterval() is called on loading
    var loading = setInterval(function() {
        $(ditto.loading_id).fadeIn(1000).fadeOut(1000);
    }, 2000);

    return loading;
}

function page_getter() {
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
    var loading = show_loading();
    $.get(path , function(data) {
        $(ditto.error_id).hide();
        $(ditto.content_id).html(marked(data));

        normalize_paths();
        create_page_anchors();

    }).fail(function() {
        show_error();

    }).always(function() {
        clearInterval(loading);
        $(ditto.loading_id).hide();

    });
}

function router() {
    var hash = location.hash;
    console.log(hash);

    if (hash.slice(1, 7) !== "search") {
        page_getter();
    } else {
        if (ditto.searchbar) {
            github_search(hash.replace("#search=", ""));
        }
    }
}
