docker network rm app_network
docker network create app_network --subnet=172.18.0.0/16

docker build -t api ./server
docker run -d -p 3001:3001 --network=app_network --ip 172.18.0.3 api

docker build -t client ./client
docker run -d -p 3000:3000 --network=app_network --ip 172.18.0.2 client



