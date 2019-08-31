# Docker Services Example

## Before Startup
+ [install docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
+ [install docker-compose](https://docs.docker.com/compose/install/)
+ [install postgress 11 client](https://computingforgeeks.com/install-postgresql-11-on-ubuntu-18-04-ubuntu-16-04/)
+ [prepare postgres no-password-file](https://stackoverflow.com/questions/32002846/run-psql-and-pg-dump-without-password-and-without-using-sudo-u-postgres)
+ install redis tool and mongo tool
    ```
    $ sudo apt-get install redis-tools
    $ sudo apt-get install mongo-tools
    ```

## How To Build Your Own Environment

#### Step 1
clone the project and change directory to `docker`
``` 
$ git clone git@github.com:csietingkai/prototype.git
$ cd docker
```

#### Step 2
write your own `.env` file
``` 
# example .env file
POSTGRES_VERSION=11.2
POSTGRES_PORT=5432
POSTGRES_DIR=./postgres/data
POSTGRES_ROOT_PASSWORD=your_postgres_password

MONGODB_VERSION=4.0
MONGODB_PORT=27017
MONGODB_DIR=./mongodb/data
MONGODB_CONFIG=./mongodb/conf/mongod.conf
MONGODB_CONFIGDB=./mongodb/configdb
MONGODB_ROOT_USERNAME=root
MONGODB_ROOT_PASSWORD=1qaz@WSX

TOMCAT_VERSION=9.0.24-jdk8-openjdk-slim
TOMCAT_DIR=./tomcat
TOMCAT_PORT=3000
```

#### Step 3
use command `docker-compose` to start your docker containers
```
$ docker-compose up -d
```

#### Step 4
use the following command to check your environments are all successfully started.
```
$ docker container ls -a
```
| CONTAINER ID | IMAGE | COMMAND | CREATED | STATUS | PORTS | NAMES |
|--------------|-------|---------|---------|--------|-------|-------|
| 9e023ea3c6b8 | postgres:11.2 | "docker-entrypoint.s…" | 19 minutes ago | Up 19 minutes | 0.0.0.0:5432->5432/tcp | postgres |
| 36542f5990dd | redis:5.0.4 | "docker-entrypoint.s…" | 19 minutes ago | Up 19 minutes | 0.0.0.0:6379->6379/tcp | redis |
| f8dd66d977c2 | mongo:4.0 | "docker-entrypoint.s…" | 19 minutes ago | Up 19 minutes | 0.0.0.0:27017->27017/tcp | mongodb  |
