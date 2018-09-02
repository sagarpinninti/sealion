#!/bin/bash
cat imglist.yml |awk 'NR!=1 {print "docker save docker.io/"$2,">"}' > t1.out
cat imglist.yml |awk 'NR!=1 {gsub("/","_");gsub(":","_");print "/tmp/ARCHIVE/dockerhub/images/"$2".tar;"}' > t2.out
echo '#!/bin/bash' > t.sh;
paste t1.out t2.out >> t.sh;
chmod +x t.sh;
cp -rp t.sh /tmp/ARCHIVE/dockerhub/t.sh;
sh /tmp/ARCHIVE/dockerhub/t.sh;
cp -rp upload.sh /tmp/ARCHIVE/dockerhub/;

