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
api_version=v"$(git log -1 --pretty=format:%h)"-"$(echo $commit_date | cut -d' ' -f1 | tr "-" .)"


if [ "$1" = ${commands[0]} ]; then
	cd docker
	docker-compose down
	docker image rm tingkai/prototype:latest
	docker-compose up -d
	docker container ls -a
	cd ..

elif [ "$1" = ${commands[1]} ]; then
	container_name=prototype-api
	cd docker
	docker container stop $container_name
	docker container rm $container_name
	cd ..
	cd backend
	mvn clean install package
	docker build . --rm --tag=tingkai/prototype --tag=tingkai/prototype:$version
	docker push tingkai/prototype:latest
	docker push tingkai/prototype:$version
	docker image rm tingkai/prototype:$version tingkai/prototype:latest
	cd ..
	cd docker
	docker-compose up -d
	cd ..

elif [ "$1" = ${commands[2]} ]; then
	echo ${commands[2]}

elif [ "$1" = ${commands[2]} ]; then
	cd docker
	timestamp=$(date +%y%m%d-%h%m%s)
	host=127.0.0.1
	backup_dir=./backup/$(date +%y%m%d)

	if [ ! -d $backup_dir ]; then 
		mkdir $backup_dir
	fi

	## read .env file as environment variables
	export $(grep -v '^#' .env | xargs -d '\n')

	## backup redis
	redis_cli=/usr/bin/redis-cli
	redis_dump_file=$backup_dir/redis-dump-$timestamp.rdb
	$redis_cli -h $host -p $redis_port -a $redis_root_password --rdb $redis_dump_file
	echo "redis dumped"

	## backup mongodb
	mongo_cli=/usr/bin/mongodump
	mongo_dump_file=$backup_dir/mongo-dump-$timestamp.archive
	$mongo_cli -h--username $mongodb_root_username --password $mongodb_root_password --authenticationdatabase=admin --forcetablescan --archive=$mongo_dump_file
	echo "mongodb dumped"

	## backup postgres
	postgres_cli=/usr/bin/pg_dumpall
	postgres_dump_file=$backup_dir/postgres-dump-$timestamp.sql
	$postgres_cli -h $host -p $postgres_port -u postgres > $postgres_dump_file
	echo "postgres dumped"

	## delete all environment variables in .env file
	unset $(grep -v '^#' .env | sed -e 's/(.*)=.*/\1/' | xargs)

	cd ..

else
	echo ""
	echo "usage: ./execute.sh [ARGS]"
	echo ""
	echo "ARGS:"
	echo -e "  localhost \t\t start localhost services, include db in docker, backend frontend in localhost"
	echo -e "  build \t\t use docker build backend image and use npm build frontend target"
	echo -e "  deploy \t\t deploy backend and frontend to docker"
fi

exit 0
