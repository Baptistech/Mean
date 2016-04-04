#!/usr/bin/env bash
docker run -d -v $(pwd):/app -w /app -p 27017 --name mongo mongo bash -c "mongod & cd db && ./seed.sh && sleep infinity"
docker run -d --link mongo:mongo -v $(pwd):/app -w /app -p 3000:3000 node:5.4 node app