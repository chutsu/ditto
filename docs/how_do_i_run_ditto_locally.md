# How do I run ditto locally?

`ditto` requires a http server in-order to send GET requests to pull the markdown
files. There are many ways to run ditto locally, perhaps the easiest is to use
Python's `SimpleHTTPServer` like so:

    cd <dir where index.html and docs/ reside>
    python -m SimpleHTTPServer

Once the server is instaciated it should begin serving your documentation at
address `127.0.0.1:8000`.



## Alternatives - LiveReload

Personally I  find it very convenient when editing markdown files in ditto
whilst using a python tool called [LiveReload][livereload]. The tool
automatically refreshes the page you are editing, giving you a dreamweaver like
live-preview of the doc you are editing.

  pip install livereload
  cd <your repo> livereload
  # serving on 127.0.0.1:35729 ...

If you run livereload at the root of your repo, it detects any file changes
and automatically refreshes the page. What I normally do is have browser and
editor side by side, as I type and save, the content on the browser gets
automatically refreshed.


[livereload]: https://github.com/lepture/python-livereload
