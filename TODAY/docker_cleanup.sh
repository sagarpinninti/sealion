#!/bin/bash
rm -rf currentlist;
docker images --digests|awk '{print $1":"$2,$3}' > currentlist;
docker rmi -f $(docker images -aq);

