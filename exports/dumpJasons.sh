#!/usr/bin/env bash

#machine="localhost"
#machine="vereniki.athenarc.gr"
#machine="dl105.madgik.di.uoa.gr"
#machine="beta.einfracentral.eu"

base="http://${machine}:8080/eic-registry/"
query="/by/id"
target="jsons"

mkdir -p ${target}
while read resourceType
do
    url="${base}${resourceType}${query}"
    response=$(curl ${url} -o ${target}/${resourceType}.json)
done < resourceTypes.txt

