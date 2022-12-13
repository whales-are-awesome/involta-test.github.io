deploy:
	# Should be built with `yarn build` and tested
	cp -r ./dist/* ../0xOuterCircle.github.io/
	@cd ../0xOuterCircle.github.io/; \
	git add ./*; \
	git status;
	@echo "Press Enter to continue"
	@read
	@cd ../0xOuterCircle.github.io/; \
	git commit -m "Release"; \
	git push;
