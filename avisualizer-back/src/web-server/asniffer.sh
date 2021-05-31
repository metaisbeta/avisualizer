#!/bin/bash
echo $1
echo $2
echo '$3'
mkdir ./projects/$2
unzip $1 -d ./asniffer
java -jar ./asniffer/asniffer.jar -p ./asniffer/$2 -r ./projects/ -t jsonAV

while [ ! -d "./projects/asniffer_results" ]; do 
	echo 'stuck';
	sleep 3; 
done;

mv ./projects/asniffer_results/*.json ./projects/$2
rm -r ./projects/asniffer_results/
rm $1
rm  -r ./asniffer/$2
