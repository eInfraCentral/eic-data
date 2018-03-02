#!/usr/bin/env bash

source=$1
target="jsons"

base="http://${source}:8080/eic-registry/"
query="/by/id"

mkdir -p ${target}

while read resourceType
do
    if [[ "$resourceType" == "vocabulary" ]]; then
        echo "Skipping vocabulary"
    else
        url="${base}${resourceType}${query}"
        echo "Fetching resources of type ${resourceType} from ${url}"
        response=$(curl -s ${url} -o ${target}/${resourceType}.json)
    fi
done < resourceTypes.txt
