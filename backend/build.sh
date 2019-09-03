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

mvn clean install package

commit_date="$(git show -s --format=%ci --date=short)"
version=v"$(git log -1 --pretty=format:%h)"-"$(echo $commit_date | cut -d' ' -f1 | tr "-" .)"

docker build . --rm --tag=tingkai/prototype --tag=tingkai/prototype:$version
docker push tingkai/prototype:latest
docker push tingkai/prototype:$version
docker image rm tingkai/prototype:$version tingkai/prototype:latest

exit 0