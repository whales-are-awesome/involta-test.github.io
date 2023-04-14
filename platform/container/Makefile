build:
	cd ..;
	npm run build;
	mv ./dist container/;

deploy:
	make image-amd64;
	make push;

image:
	docker build -t oc-app:local .

image-amd64:
	docker build --platform=linux/amd64 --no-cache -t oc-app:amd64 .

push:
	docker tag oc-app:amd64 registry.digitalocean.com/oceanport/oc-app:latest
	docker image push registry.digitalocean.com/oceanport/oc-app:latest
