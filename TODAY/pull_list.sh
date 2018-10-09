#!/bin/bash
rm -rf list.out imglist.yml;
for i in `cat imagelist`;do sh p1.sh $i;done > list.out;
echo 'img:' > imglist.yml
cat list.out|awk '{print "- "$1}' >> imglist.yml

