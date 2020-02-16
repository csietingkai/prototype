#!/bin/bash

if ! [ -x "$(command -v docker)" ]; then
	echo 'Error: docker is not installed.' >&2
fi

if ! [ -x "$(command -v git)" ]; then
	echo 'Error: git is not installed.' >&2
fi

if ! [ -x "$(command -v mvn)" ]; then
	echo 'Error: maven is not installed.' >&2
fi

if ! [ -x "$(command -v redis-cli)" ]; then
	echo 'Error: redis-tools is not installed.' >&2
fi

if ! [ -x "$(command -v mongodump)" ]; then
	echo 'Error: mongo-tools is not installed.' >&2
fi

if ! [ -x "$(command -v pg_dumpall)" ]; then
	echo 'Error: postgresql-client-11 and postgresql-client-common is not installed.' >&2
fi

declare -a commands=("localhost" "build" "deploy" "backup")

commit_date="$(git show -s --format=%ci --date=short)"
version=v"$(git log -1 --pretty=format:%h)"-"$(echo $commit_date | cut -d' ' -f1 | tr "-" .)"

user=tingkai
project_name=prototype

backend_image_name=$user/$project_name-backend
frontend_image_name=$user/$project_name-frontend

container_prefix=$project_name
backend_container_name=$container_prefix-api
frontend_container_name=$container_prefix-client

if [ "$1" = 'localhost' ]; then
	if [ "$2" = 'server' ]; then
		cd docker
		docker-compose --project-name $project_name up -d postgres mongodb redis
		docker container ls -a
		cd ..
	elif [ "$2" = 'backend' ]; then
		cd backend
		mvn clean install package spring-boot:run
		java -jar
		cd ..
	elif [ "$2" = 'frontend' ]; then
		cd frontend
		npm run start
		cd ..
	fi
elif [ "$1" = 'build' ]; then
	if [ "$2" = 'backend' ]; then
		cd docker
		docker container stop $backend_container_name
		docker container rm $backend_container_name
		cd ..
		cd backend
		sed -i "s/38080/8080/g" src/main/resources/application.properties
		mvn clean install package
		docker build . --rm --tag=$backend_image_name:latest --tag=$backend_image_name:$version
		docker push $backend_image_name:latest
		docker push $backend_image_name:$version
		docker image rm $backend_image_name:latest $backend_image_name:$version
		git checkout -- src/main/resources/application.properties
		cd ..
	elif [ "$2" = 'frontend' ]; then
		cd docker
		docker container stop $frontend_container_name
		docker container rm $frontend_container_name
		cd ..
		cd frontend
		sed -i "s/localhost/api/g" package.json
		docker build . --rm --tag=$frontend_image_name:latest --tag=$frontend_image_name:$version
		docker push $frontend_image_name:latest
		docker push $frontend_image_name:$version
		docker image rm $frontend_image_name:latest $frontend_image_name:$version
		git checkout -- package.json
		cd ..
	fi

elif [ "$1" = 'backup' ]; then
	cd docker
	./backup.sh
	cd ..

else
	echo ""
	echo "usage: ./execute.sh [ARGS]"
	echo ""
	echo "ARGS:"
	echo -e "  localhost server       start postgresql, mongodb, redis"
	echo -e "  localhost backend      start spring boot RESTful api"
	echo -e "  localhost frontend     start frontend react app"
	echo -e "  build backend          use docker build backend spring boot image"
	echo -e "  build frontend         use docker build frontend react app image"
	echo -e "  backup                 backup db data"
fi

exit 0
