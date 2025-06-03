run-app:
	sudo docker-compose up

build:
	sudo docker-compose up --build

stop:
	sudo docker-compose stop

remove-all:
	sudo docker rm $(sudo docker ps -aq)

stop-all:
	sudo docker stop $(sudo docker ps -aq)

remove-all-images:
	sudo docker rmi $(sudo docker images -q)

