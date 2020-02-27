# Docker

## What is Docker?
Docker is a containerization technology that enables us to cleanly abstract an environment configuration to a file (or set of files), and run it in a protected, isolated environment on a host. 

Compare to a virtual machine, it's more performance than a virtual machine. This provides isolation for services without the overhead of running an entire operating system on the host.

## Before Start to Use, You Need to Know...
|  | Explanation |
| ------ | ------ |
| **Image** | A pre-built abstract application. It’s ready to run, and can be run on any host that has Docker installed. The concept of images is where Docker gets its portability. Just like ISO file of operating system. |
| **Container** | An instance of a Docker image. Containers can be started, running, restarted, and stopped. We’re able to create as many containers from a single image as we need. Just like a virtual machine. |

## How to Install Docker?

This is an example of installing docker on Ubuntu 18.04 LTS, 4.18.0-21-generic, for other operating system, please checkout [official documents](https://docs.docker.com/install/)

### Step 1: Make apt can add repository through https
``` sh
$ sudo apt-get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
```

### Step 2: Add Docker's GPG key
Add GPG key of Docker.
```sh
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add
```

check key's fingerprint is correct.
```sh
$ sudo apt-key fingerprint 0EBFCD88

pub   rsa4096 2017-02-22 [SCEA]
      9DC8 5822 9FC7 DD38 854A  E2D8 8D81 803C 0EBF CD88
uid           [ unknown] Docker Release (CE deb) <docker@docker.com>
sub   rsa4096 2017-02-22 [S]
```

### Step 3: Add repository to apt
```sh
$ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

```

### Step 4: Install Docker
```sh
$ sudo apt-get install docker-ce docker-ce-cli containerd.io

```

### Step 5: Add user to group 'docker' (Optional)
By adding user to docker group, you can execute docker commands without 'sudo' prefix.
```sh
$ sudo groupadd docker
$ sudo usermod -aG docker $USER
```

### Step 6: Install Docker Compose (Optional)
Docker Compose can be used to create and manage containers easily.
```sh
$ sudo apt-get install docker-compose
```

## Build A Image
We take a java application for example:

```java
  1 public class Main {
  2     public static void main(String[] args) {
  3         System.out.println("Hello, Docker");
  4     }
  5 }
```

Normal way will be like:
```sh
$ javac Main.java
$ java Main
Hello, Docker
```

Then we use Dockerfile to describe image how to build and run.

Here is `Dockerfile`
```
  1 # base image
  2 FROM openjdk:8-jdk-stretch 
  3 
  4 # copy files to folder 'tmp' in image
  5 COPY . /tmp
  6
  7 # aka 'cd /tmp'
  8 WORKDIR /tmp
  9
 10 # compile sources
 11 RUN javac Main.java
 12
 13 # what will execute after image startup as a container
 14 CMD ["java", "Main"]
```

then we execute command `docker build .` and give image a name: `java-demo`
```sh
$ docker build . --tag=java-demo
Sending build context to Docker daemon  3.072kB
Step 1/5 : FROM openjdk:8-jdk-stretch
 ---> b84359d0cbce
Step 2/5 : COPY . /tmp
 ---> e6b69ed50e59
Step 3/5 : WORKDIR /tmp
 ---> Running in 1b80c502e983
Removing intermediate container 1b80c502e983
 ---> fbb0283c2c86
Step 4/5 : RUN javac Main.java
 ---> Running in b50c0c7a92cb
Removing intermediate container b50c0c7a92cb
 ---> ebf5d2d1f9a2
Step 5/5 : CMD ["java", "Main"]
 ---> Running in 29753e991166
Removing intermediate container 29753e991166
 ---> 320b918ceea3
Successfully built 320b918ceea3
Successfully tagged java-demo:latest
```

##### _**Success!!**_
now you have your own image, you can execute `docker run` to start the image.
```sh
$ docker run java-demo:latest
Hello, Docker
```

## Configure Your Environment
Not only images build by yourself, there are so many software images had push on [Docker Hub](https://hub.docker.com/) by thier creaters such as mysql, tomcat ... etc. You can also download the image and use it to create your environment.

Now we take MongoDB for example.

### Step 1: Pull Image from Docker Hub
It can choose version of MongoDB, we use latest aka default.
```sh
$ docker pull mongo
Using default tag: latest
latest: Pulling from library/mongo
35b42117c431: Pull complete 
ad9c569a8d98: Pull complete 
293b44f45162: Pull complete 
0c175077525d: Pull complete 
4e73525b52ba: Pull complete 
a22695a3f5e9: Pull complete 
420eb4b7be5d: Pull complete 
017ec49b70bf: Pull complete 
26470656e2db: Pull complete 
6fec56c7382a: Pull complete 
12f574d1345c: Pull complete 
7102859c924d: Pull complete 
555c1275dd6f: Pull complete 
Digest: sha256:01dc9fb0b7aae875678047e2d8550beb6fc34b7e76c60a1e7d7048f6700dead0
Status: Downloaded newer image for mongo:latest
$ docker image ls
REPOSITORY     TAG             IMAGE ID          CREATED             SIZE
java-demo      latest          320b918ceea3      About an hour ago   488MB
mongo          latest          a3639b2a0f13      25 hours ago        412MB
openjdk        8-jdk-stretch   b84359d0cbce      8 days ago          488MB
hello-world    latest          fce289e99eb9      5 months ago        1.84kB
```

### Step 2: Start MongoDB Service
Create and start a container with local port=27017.
```sh
$ docker run -d -p 27017:27017 mongo:latest
```

### Step 3: Check it Works
use the following commnad or your MonogDB client app to check it's connected or not.
```sh
$ echo 'db.runCommand("ping").ok' | mongo localhost:27017/test --quiet
1
```

## Use Docker Compose to Create and Maintain Multiple Containers
If you want to start three containers, you have to type three times, such waste time.

If someone else take care your work to maintain thiese services, he even doesn't know what arguments you used in creating containers.

These things cause difficulty when maintaining services on Docker. Therefore we use Docker Compose to deal with these problems.

Here is a example of `docker-compose.yml`
```yml
  1 version: "3"
  2 
  3 services:
  4   mongodb:                     # service name, 
  5     image: mongo               # image and its version
  6     container_name: mongodb    # container name
  7     ports:                     # localhost port : container exposed port
  8       - 27017:27017
  9   tomcat:
 10     image: tomcat
 11     container_name: tomcat
 12     ports:
 13       - 8080:8080
```

Then use command `docker-compose up` to start Tomcat and MongoDB
```sh
$ docker-compose up
Starting mongodb ... 
Starting tomcat ...
Starting mongodb ... done
Starting tomcat ... done
Attaching to mongodb, tomcat
mongodb    | 2019-06-20T09:46:56.862+0000 I CONTROL  [main] Automatically disabling TLS 1.0, to force-enable TLS 1.0 specify --sslDisabledProtocols 'none'
tomcat     | 20-Jun-2019 09:46:59.337 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log Server version:        Apache Tomcat/8.5.42
mongodb    | 2019-06-20T09:46:56.867+0000 I CONTROL  [initandlisten] MongoDB starting : pid=1 port=27017 dbpath=/data/db 64-bit host=e70d04f39e3d
tomcat     | 20-Jun-2019 09:46:59.342 INFO [main] org.apache.catalina.startup.VersionLoggerListener.log Server built:          Jun 4 2019 20:29:04 UTC
...
```

if you want to run in background, add `-d` argument
```sh
$ docker-compose up -d
Starting mongodb ... 
Starting tomcat ...
Starting mongodb ... done
Starting tomcat ... done
$ docker container ls
```
| CONTAINER ID | IMAGE | COMMAND | CREATED | STATUS | PORTS | NAMES |
| ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| e70d04f39e3d | mongo | "docker-entrypoint.s…" | 15 minutes ago | Up 33 seconds | 0.0.0.0:27017->27017/tcp | mongodb |
| 1896721ac863 | tomcat | "catalina.sh run" | 15 minutes ago | Up 34 seconds | 0.0.0.0:8080->8080/tcp | tomcat |

## Reference
+ [Docker Official Docs](https://docs.docker.com/)
+ [Runnable](https://runnable.com/docker/what-is-docker)
