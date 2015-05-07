# How does it work?

**Contents**:

- General
- Other

## General
When you open the `index.html` file, the javascript file `ditto.js` opens
`sidebar.md` and `README.md` files converts the file using
[marked][marked_github] and displays the rendered html (unless defined
differently by you otherwise).

![layout](images/layout.png)

Documentation defined in `sidebar.md` should be of the form:

    #folder_containing_docs/file_name_without_extension


For example:

    - #docs/document_1
    - #docs/document_2
    - #docs/document_3

When you click on the link, the hash is parsed and modified in such a way it
converts it back to the file location where the documentation is:


    From:                         To:

    #docs/document_1 -----------> docs/document_1.md


`jQuery` then launches a GET request to the server requesting the markdown file
and uses `marked` up to render the file and display it in `#content`.


## Other
`ditto` also performs other magick as well, such as :

- Normalizing paths
- Creating page anchors automatically


### Normalizing paths
For example say you are editing the doc in `docs/some_doc.md` and you link the
image in `docs/images/image_1.jpg`. Naturally when you edit the file you would
write this in markdown:


    ![some image](images/image_1.jpg)


However that doesn't work without magick, because the server root is `/` and it would look for
`images/image_1.jpg`, which is the wrong place.

To fix that issue, `ditto` simply gathers the `window.location` and
`window.location.hash`, does some path normalizing, and performs a search and
replace on the page to fix that issue.


### Creating page anchors automatically
Using `jQuery` all the `li` tags are parsed, and if it matches any html headers
(e.g. `h2`), an event listener is created on the `li` tag, such that if you
click on the `li` element, the page would automatically scroll down to the
relevant section, with the relevant section glowing red for a moment to attract
attention.


[marked_github]: https://github.com/chjj/marked
