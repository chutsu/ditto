# How do I run ditto locally?

`ditto` requires a http server in-order to send GET requests to pull the markdown
files. There are many ways to run ditto locally, perhaps the easiest is to use
Python's `SimpleHTTPServer` like so:

    cd <dir where index.html and docs/ reside>
    python -m SimpleHTTPServer

Once the server is instaciated it should begin serving your documentation at
address `127.0.0.1:8000`.
