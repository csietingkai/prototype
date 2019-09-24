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

if [ "$1" = 'localhost' ]; then
	container_prefix=prototype
	docker container start $container_prefix-postgres $container_prefix-mongodb $container_prefix-redis
	docker container ls -a

elif [ "$1" = 'build' ]; then
	backend_container_name=prototype-api
	frontend_container_name=prototype-client
	cd docker
	docker container stop $backend_container_name
	docker container rm $backend_container_name
	docker container stop $frontend_container_name
	docker container rm $frontend_container_name
	cd ..
	backend_image_name=tingkai/prototype-backend
	cd backend
	mvn clean install package
	docker build . --rm --tag=$backend_image_name:latest --tag=$backend_image_name:$version
	docker push $backend_image_name:latest
	docker push $backend_image_name:$version
	docker image rm $backend_image_name:latest $backend_image_name:$version
	cd ..
	frontend_image_name=tingkai/prototype-frontend
	cd frontend
	docker build . --rm --tag=$frontend_image_name:latest --tag=$frontend_image_name:$version
	docker push $frontend_image_name:latest
	docker push $frontend_image_name:$version
	docker image rm $frontend_image_name:latest $frontend_image_name:$version
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
fi

exit 0
