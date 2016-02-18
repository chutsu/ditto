#!/bin/sh

generate_files() {
    echo "";
    echo "";
    echo "downloading / generating ditto files ... ";

    # download ditto index file
    curl -O http://chutsu.github.io/ditto/ver/latest/index.html

    # create sidebar file
    cat << EOF > sidebar.md
# [Your Project Name](Your project link)

- [FAQ](#docs/faq)
- [API](#docs/api)

## REMOVE THE FOLLOWING COMMENT AFTER YOU READ IT
In the above two links (FAQ and API) ditto will look for files in
'docs/faq.md' and 'docs/api.md'. (i.e. it automatically appends the '.md' to
your links so you don't have to)
EOF

cat << EOF > docs/faq.md
# FAQ
FAQ content here!!
EOF

cat << EOF > docs/api.md
# API
API content here!!
EOF

    echo "";
    echo "";
}

print_instructions() {
    echo "**IMPORTANT INSTRUCTIONS**:";
    echo "STEP 1: Edit files";
    echo "- index.html";
    echo "- sidebar.md";
    echo "instructions are inside those files";
    echo "";

    echo "STEP 2: Test your site";
    echo "To test your site enter the following command:";
    echo "";
    echo "  python -m SimpleHTTPServer";
    echo "";
    echo "when you run the server, go visit 'localhost:8000' with your browser.";
    echo "For more information visit: http://chutsu.github.io/ditto/";
    echo "";
    echo "";
}

main() {
    clear;
    echo "This script will generate your ditto site by doing the following:"
    echo "- create a 'docs' folder (will **NOT** overwrite if it exists!)"
    echo "- download index.html"
    echo "- create sidebar.md"

    while true
    do
        read -r -p 'Do you want to continue? (y/n): ' choice
        case "$choice" in
            n|N) break;;
            y|Y)
                mkdir -p docs
                generate_files
                print_instructions
                break
            ;;
            *) echo 'Invalid input! Please answer y or n!';;
        esac
    done
}


# RUN MAIN
main
