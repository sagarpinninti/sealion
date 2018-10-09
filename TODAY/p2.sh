#!/bin/bash
for img in $* ; do
curl -sq https://registry.hub.docker.com/v1/repositories/library/$img/tags |jq '.[]|.name'|sort -V|tr -d '[:alpha:]'|tr -d '[:alpha:" "]'|sort -nur|
grep -Ev "master|beta|latest|onbuild|test|unstable|light|full" |
awk '!NF || !seen[$0]++'|awk 'NF > 0'|head -3|sed -e "s#^#${img}:#"
done
