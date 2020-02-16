# Prototype of Web App
An example application build with [Docker](https://www.docker.com/), [Spring Boot](https://spring.io/projects/spring-boot), and [React](https://reactjs.org/)
### How To Start
The following instructions is used on Ubuntu, for other distro, please find your own way to start the project.

#### Step 0: Pre Install
For this project, we need Docker to start server, spring boot for backend, and react with npm for frontend.

Checkout following instructions you need

+ [How To Clone The Project on GitHub](instructions/git.md)
+ [How To Install And Use Docker](instructions/docker.md)
+ [How To Install And Use Maven](instructions/maven.md)
+ [How To Install And Use Npm](instructions/npm.md)

#### Step 1: Start the Server
Start the server which includes [PostgreSQL](https://www.postgresql.org/), [MongoDB](https://www.mongodb.com/), and [Redis](https://redis.io/).

If you have docker and docker-compose installed, you can just make sure file `execute.sh` is executable and execute the command:
```
./execute.sh localhost server
// OR
cd docker/
docker-compose up -d postgres mongodb redis
```

then you will see the following messages which mean you started the server successfully.
```
Starting prototype-postgres ... 
Starting prototype-mongodb ... 
Starting prototype-redis ... 
Starting prototype-postgres ... done
Starting prototype-mongodb ... done
Starting prototype-redis ... done
``` 

#### Step 2: Start Spring Boot Application
We use Spring Boot as api of this project.

If you have maven installed, just execute command: 
```
./execute.sh localhost backend
// OR
cd backend
mvn clean install spring-boot:run
```

#### Step 3: Start React App
We use npm to manage and execute react app.

If you have npm installed, just execute command: 
```
./execute.sh localhost frontend
// OR
cd frontend
npm install
npm run start
```

#### Step 4: Done!!
Open your browser and type `localhost:33000`, the project will show on your screen

## More About This Application

