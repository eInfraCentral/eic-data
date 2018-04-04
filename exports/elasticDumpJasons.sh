#!/usr/bin/env bash

source=$1
target="elasticJasons"

base="http://${source}:9222/"
query="/_search?size=1000"

mkdir -p ${target}

while read resourceType
do
    resourceTypeName=${resourceType}
    if [[ "$resourceTypeName" == "user" ]]; then
        resourceTypeName=einfrauser
    fi
    url="${base}${resourceTypeName}${query}"
    echo "Fetching resources of type ${resourceType} from ${url}"
    response=$(curl -s ${url} -o ${target}/${resourceType}.json)
done < resourceTypes.txt
