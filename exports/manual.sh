#!/usr/bin/env bash

#machine=dl105.madgik.di.uoa.gr
#machine="vereniki.athenarc.gr"
machine="beta.einfracentral.eu"
base="http://${machine}:8080/eic-registry/"
query="/by/id"

while read resourceType
do
    url="${base}${resourceType}${query}"
    echo ${url}
    response=$(curl ${url} -o jsons/${resourceType}.json)
    echo ${response}
done < resourceTypes.txt
