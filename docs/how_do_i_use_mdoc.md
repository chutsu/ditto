# How do I use mdoc?

Contents:
- File Structure
- index.html
- sidebar.md
- README.md


## File Structure
`mdoc` expects the file structure of your documentation website to look
something like this:


    index.html
    sidebar.md
    README.md
    docs/  # insert markdown files here!

## index.html
[Download][index_file](<- right-click "Save as") or copy the following code
snippet and save it as `index.html`

    <!DOCTYPE html>
    <html>
    <head>
        <!-- jQuery -->
        <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
        <script src="http://code.jquery.com/ui/1.10.4/jquery-ui.min.js"></script>

        <!-- marked -->
        <script src="http://chutsu.github.io/mdoc/ver/0.1/marked.min.js"></script>

        <!-- mdoc -->
        <script src="http://chutsu.github.io/mdoc/ver/0.1/mdoc.js"></script>
        <link href="http://chutsu.github.io/mdoc/ver/0.1/mdoc.css" rel="stylesheet">
    </head>
    <body>
        <!-- essential -->
        <div id="sidebar"></div>
        <div id="content"></div>

        <!-- optional -->
        <div id="back_to_top">back to top</div>
        <div id="edit">edit</div>
        <div id="loading">Loading ...</div>
        <div id="error">Opps! ... File not found!</div>

        <!-- custom script -->
        <script>
            // essential settings
            mdoc.index = "README.md";
            mdoc.sidebar_file = "sidebar.md";

            // where the docs are actually stored on github - so you can edit
            mdoc.base_url = ""; <!----------- EDIT THIS LINE! --------------->

            // run
            mdoc.run();
        </script>
    </body>
    </html>

Edit `mdoc.index`, `mdoc.sidebar_file` and `mdoc.base_url` as you see fit. 


## sidebar.md
In the `sidebar.md` file you can create links to documentation you wish to list
(just as you would in markdown). You have to list them in the form:

    #folder_containing_docs/file_name_without_extension


For example:

    - [Documentation 1](#docs/document_1)
    - [Documentation 2](#docs/document_2)
    - [Documentation 3](#docs/document_3)


**IMPORTANT NOTE**:
- Add `#` infront of `docs`, where `docs` is the folder where `document_1.md` resides
- Also ___DO NOT___ INCLUDE THE FILE EXTENSION AT THE END!

## README.md
Do I really have to tell you what to put in here?



[index_file]: http://raw.githubusercontent.com/chutsu/mdoc/master/ver/0.1/index.html
