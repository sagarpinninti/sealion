#!/bin/bash

mv imglist.yml imglist.yml-old;
echo  'imgs:' > imglist.yml
######## Centos ###########
curl -sq https://registry.hub.docker.com/v1/repositories/centos/tags  |jq '.[] | .name' |sort -ruV |tr -d '[:" "]' |sed -n '2,3p'| awk '{print "-", "centos:"$0}' >> imglist.yml

##### Cirros ####
curl -sq https://registry.hub.docker.com/v1/repositories/cirros/tags  |jq '.[] | .name' |sort -ruV |tr -d '[:" "]' |sed -n '2,3p'| awk '{print "- cirros:"$0}' >> imglist.yml;

######## Debian #######
curl -sq https://registry.hub.docker.com/v1/repositories/debian/tags  |jq '.[] | .name' | sort -V|tr -d '[:alpha:]' |tr -d '[:alpha:" "]'|sort -nru |tr -d -|head -2| awk '{print "- debian:"$0}' >> imglist.yml;
#curl -sq https://registry.hub.docker.com/v1/repositories/debian/tags  |jq '.[] | .name' |sort -ruV |tr -d '[:" "]'|grep -i latest | awk '{print "- debian:"$0}'  >> imglist.yml;

####### Alpine ##############
curl -sq https://registry.hub.docker.com/v1/repositories/alpine/tags  |jq '.[] | .name' | sort -V|tr -d '[:alpha:]' |tr -d '[:alpha:" "]'|sort -nru |tr -d -|head -2| awk '{print "- alpine:"$0}' >> imglist.yml;
######## Ubuntu ###
curl -sq https://registry.hub.docker.com/v1/repositories/ubuntu/tags  |jq '.[] | .name' | sort -V|tr -d '[:alpha:]' |tr -d '[:alpha:" "]'|sort -nru |tr -d -|head -2| awk '{print "- ubuntu:"$0}' >> imglist.yml;
######## busybox ######
curl -sq https://registry.hub.docker.com/v1/repositories/busybox/tags  |jq '.[] | .name' | sort -V|tr -d '[:alpha:]' |tr -d '[:alpha:" "]'|sort -nru |tr -d -|head -2| awk '{print "- busybox:"$0}' >> imglist.yml;
########### Node-Alpine #######
curl -sq https://registry.hub.docker.com/v1/repositories/node/tags  |jq '.[] | .name' |grep -i alpine| sort -V|tr -d '[:alpha:]' |tr -d '[:alpha:" "]'|sort -nru |tr -d -|head -2| awk '{print "- node:"$0"-alpine"}' >> imglist.yml;
###Golang#######
curl -sq https://registry.hub.docker.com/v1/repositories/golang/tags  |jq '.[] | .name' |grep -i alpine| sort -V|tr -d '[:alpha:]' |tr -d '[:alpha:" "]'|sort -nru |tr -d -|head -2|awk '{print "- golang:alpine"$0}' >> imglist.yml;
#### Redis#######
curl -sq https://registry.hub.docker.com/v1/repositories/redis/tags |jq '.[] | .name' |grep -i alpine|sort -nr|head -3|tr -d '[:" "]'|awk '{print "- redis:"$0""}' >> imglist.yml
########### Postgres-Alpine #######
curl -sq https://registry.hub.docker.com/v1/repositories/postgres/tags  |jq '.[] | .name' |grep -i alpine| sort -V|tr -d '[:alpha:]' |tr -d '[:alpha:" "]'|sort -nru |tr -d -|head -2| awk '{print "- postgres:"$0"-alpine"}' >> imglist.yml;
############ Nginx 

############ Python ############
curl -sq https://registry.hub.docker.com/v1/repositories/python/tags  |jq '.[] | .name' | sort -V|tr -d '[:alpha:]' |tr -d '[:alpha:" "]'|sort -nru |tr -d -|head -2| awk '{print "- python:"$0}' >> imglist.yml;
####### Hashicorp-Terraform ################
curl -sq https://registry.hub.docker.com/v1/repositories/hashicorp/terraform/tags  |jq '.[] | .name' |sort -ruV |tr -d '[:" "]' |sed -n '4,5p'| awk '{print "- hashicorp/terraform:"$0}' >> imglist.yml;
############ Mongo ########
curl -sq https://registry.hub.docker.com/v1/repositories/mongo/tags  |jq '.[] | .name' | sort -V|tr -d '[:alpha:]' |tr -d '[:alpha:" "]'|sort -nru |tr -d -|head -2| awk '{print "- mongo:"$0}' >> imglist.yml;
############## Prometheus-bosybox ###################
curl -sq https://registry.hub.docker.com/v1/repositories/prom/busybox/tags |jq '.[] | .name'|tr -d '[:" "]'|awk '{print "- prom/busybox:"$0}' >> imglist.yml;
############ Grafana ###############
curl -sq https://registry.hub.docker.com/v1/repositories/grafana/grafana/tags  |jq '.[] | .name' | sort -V|tr -d '[:alpha:]' |tr -d '[:alpha:" "]'|sort -nru |tr -d -|head -2| awk '{print "- grafana/grafana:"$0}' >> imglist.yml;
############ kibana ###############
curl -sq https://registry.hub.docker.com/v1/repositories/kibana/tags  |jq '.[] | .name' | sort -V|tr -d '[:alpha:]' |tr -d '[:alpha:" "]'|sort -nru |tr -d -|head -2| awk '{print "- kibana:"$0}' >> imglist.yml;
############### Fluentd#####################
curl -sq https://registry.hub.docker.com/v1/repositories/fluent/fluentd/tags  |jq '.[] | .name' | sort -V|tr -d '[:alpha:]' |tr -d '[:alpha:" "]'|sort -nru |tr -d -|head -2| awk '{print "- fluent/fluentd:v"$0}' >> imglist.yml;
################ Elasticsearch #################
curl -sq https://registry.hub.docker.com/v1/repositories/elasticsearch/tags  |jq '.[] | .name' | sort -V|tr -d '[:alpha:]' |tr -d '[:alpha:" "]'|sort -nru |tr -d -|head -2| awk '{print "- elasticsearch:"$0}' >> imglist.yml;
############### bitnami-monocular-api & bitnami-monocular-ui ################
curl -sq https://registry.hub.docker.com/v1/repositories/bitnami/monocular-ui/tags |jq '.[] | .name' |sort -ruV |tr -d '[:" "]' |sed -n '1,2p'|awk '{print "- bitnami/monocular-ui:"$0}' >> imglist.yml;
curl -sq https://registry.hub.docker.com/v1/repositories/bitnami/monocular-api/tags |jq '.[] | .name' |sort -ruV |tr -d '[:" "]' |sed -n '1,2p'|awk '{print "- bitnami/monocular-api:"$0}'  >> imglist.yml;

#################################################################### COMPARE SCRIPT ##############################################################
echo 'imgs:' > diff_list.yml;diff imglist.yml-old imglist.yml|awk 'NR!=1 {print $2,$3}' >> diff_list.yml

