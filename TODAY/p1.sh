#!/bin/bash
for img in $* ; do
curl -sq https://registry.hub.docker.com/v1/repositories/$img/tags |jq '.[]|.name'|grep -v '-'|grep [0-9]|grep -F '.'|sort -Vr|tr -d '[:alpha:]|"|-'|
grep -Ev "master|beta|latest|onbuild|test|unstable|light|full" |
awk '!NF || !seen[$0]++'|awk 'NF > 0'|head -2|sed -e "s#^#${img}:#"
done
