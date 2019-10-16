#!/bin/bash

if ! [ -x "$(command -v docker)" ]; then
	echo 'Error: docker is not installed.' >&2
	exit 1
fi

if ! [ -x "$(command -v git)" ]; then
	echo 'Error: git is not installed.' >&2
	exit 1
fi

if ! [ -x "$(command -v mvn)" ]; then
	echo 'Error: maven is not installed.' >&2
	exit 1
fi

if ! [ -x "$(command -v redis-cli)" ]; then
	echo 'Error: redis-tools is not installed.' >&2
	exit 1
fi

if ! [ -x "$(command -v mongodump)" ]; then
	echo 'Error: mongo-tools is not installed.' >&2
	exit 1
fi

if ! [ -x "$(command -v pg_dumpall)" ]; then
	echo 'Error: postgresql-client-11 and postgresql-client-common is not installed.' >&2
	exit 1
fi

declare -a commands=("localhost" "build" "deploy" "backup")

commit_date="$(git show -s --format=%ci --date=short)"
version=v"$(git log -1 --pretty=format:%h)"-"$(echo $commit_date | cut -d' ' -f1 | tr "-" .)"

backend_image_name=tingkai/prototype-backend
frontend_image_name=tingkai/prototype-frontend

container_prefix=prototype
backend_container_name=$container_prefix-api
frontend_container_name=$container_prefix-client

if [ "$1" = 'localhost' ]; then
	cd docker
	docker-compose up -d postgres mongodb redis
	docker container ls -a
	cd ..

elif [ "$1" = 'build' ]; then
	cd docker
	docker container stop $backend_container_name
	docker container rm $backend_container_name
	docker container stop $frontend_container_name
	docker container rm $frontend_container_name
	cd ..
	cd backend
	mvn clean install package
	docker build . --rm --tag=$backend_image_name:latest --tag=$backend_image_name:$version
	docker push $backend_image_name:latest
	docker push $backend_image_name:$version
	docker image rm $backend_image_name:latest $backend_image_name:$version
	cd ..
	cd frontend
	sed -i "s/localhost/api/g" package.json
	docker build . --rm --tag=$frontend_image_name:latest --tag=$frontend_image_name:$version
	docker push $frontend_image_name:latest
	docker push $frontend_image_name:$version
	docker image rm $frontend_image_name:latest $frontend_image_name:$version
	git checkout -- package.json
	cd ..

elif [ "$1" = 'deploy' ]; then
	echo ${commands[2]}

elif [ "$1" = 'backup' ]; then
	cd docker
	./backup.sh
	cd ..

elif [ "$1" = 'backend' ]; then
	cd backend
	mvn clean install package spring-boot:run

elif [ "$1" = 'frontend' ]; then
	cd frontend
	npm start

elif [ "$1" = 'clean' ]; then
	cd docker
	docker-compose stop
	docker container rm $backend_container_name $frontend_container_name
	docker image rm $backend_image_name:latest $frontend_image_name:latest
	cd ..

else
	echo ""
	echo "usage: ./execute.sh [ARGS]"
	echo ""
	echo "ARGS:"
	echo -e "  localhost \t\t start localhost services, include db in docker"
	echo -e "  build \t\t use docker build backend and frontend image"
	echo -e "  deploy \t\t deploy backend and frontend to docker"
	echo -e "  backup \t\t backup db data"
	echo -e "  backend \t\t start backend localhost"
	echo -e "  frontend \t\t start frontend localhost"
	echo -e "  clean \t\t remove frontend and backend image and container"
fi

exit 0
