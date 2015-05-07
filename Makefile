default:
	@echo "targets:"
	@echo "  - version: make a new ditto version"
	@echo "  - update_latest: update latest ditto version"
	@echo "  - run_server: run local http server"

update_latest:
	@mkdir -p ver/latest; \
	cp css/* ver/latest; \
	cp js/* ver/latest; \
	cp templates/* ver/latest; \
	sed -i 's/VER/latest/g' ver/latest/index.html; \
	echo "updated latest!"

version: update_latest
	@read -p "enter new version name: " new_version; \
	mkdir -p ver; \
	mkdir ver/$$new_version; \
	cp css/* ver/$$new_version; \
	cp js/* ver/$$new_version; \
	cp templates/* ver/$$new_version; \
	sed -i 's/VER/'$$new_version'/g' ver/$$new_version/index.html; \
	echo "done :)"

run_server:
	python -m SimpleHTTPServer
