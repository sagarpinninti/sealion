#!/bin/bash
for img in $* ; do
curl -sq https://registry.hub.docker.com/v2/repositories/$img/tags/ |jq '.results[] .name'|grep -Ev 'beta|latest|master'|sort -Vr|tr -d '[:alpha:]|"|-'|
grep -Ev "master|beta|latest|onbuild|test|unstable|light|full" |
awk '!NF || !seen[$0]++'|awk 'NF > 0'|head -3|sed -e "s#^#${img}:#"
done
