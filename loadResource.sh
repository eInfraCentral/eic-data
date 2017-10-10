#!/bin/bash

verbose="--write-out \%\{http\_code\} --silent --output /dev/null"


function json {
	cat $1 | python -c 'import json,sys; print(json.dumps(sys.stdin.read()))'
}

function post_resourceType {
	data=`cat $1`
	response=$(curl -X POST --write-out %{http_code} --silent --output /dev/null --data "$data" --header "Content-Type:application/json" http://$2:8080/eic-registry/resourceType/)
	if ((${response} >= 200 && ${response} < 300 )); then
		colors="\e[32m"
	else
		colors="\e[31m"
	fi
	echo -e "[${colors}${response}\e[0m] Resource posted --> $1"
}

function load_resource {
	for file in `ls -d $1/*.xml`; do
		# data=`json $file`
		# echo "/request/$(basename $1)"
		# cat $file
		# response=$(curl -X POST --write-out %{http_code} --silent --output POST/$(basename $file) --data  "{\"resourceType\":\"$(basename $1)\", \"payloadFormat\":\"xml\", \"payload\":$data}" --header "Content-Type:application/json" http://$2:8080/eic-registry/resources/)
		response=$(curl -X POST --write-out %{http_code} --silent --output POST/$(basename ${file}) --data @${file}  --header "Content-Type:application/xml" http://$2:8080/eic-registry/$(basename $1))
		if ((${response} >= 200 && ${response} < 300 )); then
			colors="\e[32m"
			#rm POST/$(basename $file)
		else 
			colors="\e[31m"
		fi
		# echo -e "[${colors}${response}\e[0m] Posting [$(basename $1)] to $2 --> $(basename $file)"
		printf "[${colors}%3d\e[0m] Posting [%9s] to %9s --> %s\n" "${response}" "$(basename $1)" "$2" "$(basename ${file})"

		if ((${response} < 200 || ${response} >= 300 )); then
			read input </dev/tty
		fi
	done

}

# for resource in `ls -d tools/*.json`; do
# 	post_resourceType $resource $1

# done

# wait
# echo "FINISHED UPLOADING RESOURCE TYPES"

for dir in `ls -d ./*.res/`; do 
	#echo -e "\e[32m ### $dir ###\e[0m"
	load_resource ${dir} $1 &
done

wait
