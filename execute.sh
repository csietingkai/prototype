#!/bin/bash

## check commands used in this bash file are all installed
check_tools () {
	if ! [ -x "$(command -v $1)" ]; then
		echo 'Error:' $1 'is not installed.' >&2
		return 1
	fi
	return 0
}

declare -a tools=( 'docker' 'git' 'mvn' 'redis-cli' 'mongodump' 'pg_dumpall')
check_result=0
for tool in "${tools[@]}" 
do
	check_tools $tool
	if [ $? -eq 1 ]; then
		check_result=$?
	fi
done

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
		docker-compose --project-name $project_name up -d postgres mongo redis
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
		mvn clean install package
		docker build . --rm --tag=$backend_image_name:$version
#		docker push $backend_image_name:$version
		docker image rm $backend_image_name:$version
		cd ..
	elif [ "$2" = 'frontend' ]; then
		cd docker
		docker container stop $frontend_container_name
		docker container rm $frontend_container_name
		cd ..
		cd frontend
		docker build . --rm --tag=$frontend_image_name:$version
#		docker push $frontend_image_name:$version
		docker image rm $frontend_image_name:$version
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
