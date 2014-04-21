# How do I use ditto?

Contents:
- File Structure
- index.html
- sidebar.md
- README.md


## File Structure
`ditto` expects the file structure of your documentation website to look
something like this:

    index.html
    sidebar.md
    README.md
    docs/  # insert markdown files here!

## index.html
**NOTE**: Before you create the `index.html` file, please know that `ditto`
requires a http server for the documentation to be pulled down. If you're using
`gh-pages` in your github, just push this `index.html` along with other files
discussed in section `File Structure` to your `gh-pages` branch on github to
host your files.

[Download][index_file](<- right-click "Save as") or copy the following code
snippet and save it as `index.html`

    <!DOCTYPE html>
    <html>
    <head>
        <!-- jQuery -->
        <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
        <script src="http://code.jquery.com/ui/1.10.4/jquery-ui.min.js"></script>

        <!-- marked -->
        <script src="http://chutsu.github.io/ditto/ver/0.1/marked.min.js"></script>

        <!-- ditto -->
        <script src="http://chutsu.github.io/ditto/ver/0.1/ditto.js"></script>
        <link href="http://chutsu.github.io/ditto/ver/0.1/ditto.css" rel="stylesheet">
    </head>
    <body>
        <!-- essential -->
        <div id="sidebar"></div>
        <div id="content"></div>

        <!-- optional -->
        <div id="back_to_top">back to top</div>
        <div id="edit">edit</div>
        <div id="loading">Loading ...</div>
        <div id="error"></div>

        <!-- custom script -->
        <script>
            // essential settings
            ditto.index = "README.md";
            ditto.sidebar_file = "sidebar.md";

            // optional settings if you want github search
            ditto.github_username = null;   // <-- EDIT THIS LINE! e.g. "chutsu"
            ditto.github_repo = null;       // <-- EDIT THIS LINE! e.g. "ditto"

            // where the docs are actually stored on github - so you can edit
            // e.g. https://github.com/chutsu/ditto/edit/gh-pages/
            ditto.base_url = "";            // <-- EDIT THIS LINE!

            // run
            ditto.run();
        </script>
    </body>
    </html>

Edit:
- `ditto.index`
- `ditto.sidebar_file`
- `ditto.github_username`
- `ditto.github_repo`
- `ditto.base_url`

as you see fit.


## sidebar.md
In the `sidebar.md` file you can create links to documentation you wish to list
(just as you would in markdown). You have to list them in the form:

    #folder_containing_docs/file_name_without_extension

For example:

    - [Documentation 1](#docs/document_1)
    - [Documentation 2](#docs/document_2)
    - [Documentation 3](#docs/document_3)

If you want the GitHub search bar enter the following in the same file:

    [ditto:searchbar]

**IMPORTANT NOTE**:
- Add `#` infront of `docs`, where `docs` is the folder where `document_1.md` resides
- Also ___DO NOT___ INCLUDE THE FILE EXTENSION AT THE END!

## README.md
Do I really have to tell you what to put in here?



[index_file]: http://raw.githubusercontent.com/chutsu/ditto/master/ver/0.1/index.html
