default:
	@echo "targets:"
	@echo "  - version: make a new mdoc version"
	@echo "  - run_server: run local http server"

version:
	@read -p "enter new version name: " new_version; \
	mkdir ver/$$new_version; \
	cp css/* ver/$$new_version; \
	cp js/* ver/$$new_version; \
	cp templates/index.html ver/$$new_version/index.html; \
	sed -i "" 's/VER/'$$new_version'/g' ver/$$new_version/index.html; \
	echo "done :)"

run_server:
	python -m SimpleHTTPServer
