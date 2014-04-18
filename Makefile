default:
	@echo "targets:"
	@echo "\tversion:"
	@echo "\trun_server:"


version:
	@read -p "enter new version name: " new_version; \
	mkdir ver/$$new_version; \
	cp css/* ver/$$new_version; \
	cp js/* ver/$$new_version; \
	echo "done :)"

run_server:
	python -m SimpleHTTPServer
