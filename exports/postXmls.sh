#!/usr/bin/env bash

#machine="localhost"
#machine="vereniki.athenarc.gr"
machine="dl105.madgik.di.uoa.gr"
#machine="beta.einfracentral.eu"

base="http://${machine}:8080/eic-registry/"
source="xmls"

postAllResourcesForType() {
    for file in $(ls ./${source}/$1); do
        postResource $1 ${file}
    done
}
postResource() {
    cmd="curl -v --silent --output /dev/null --write-out %{http_code} --trace-ascii curl_trace.txt --data @./${source}/${1}/${2} --header Content-Type:application/xml ${base}${1}"
    response=$(${cmd})
    if ((${response} >= 200 && ${response} < 300 )); then
        colors="\e[32m"
    else
        colors="\e[31m"
    fi
    printf "[${colors}%3d\e[0m] Posting [%9s] to %9s --> %s\n" "${response}" "${2}" "${machine}" "$1"
    if ((${response} < 200 || ${response} >= 300 )); then
        read input </dev/tty
    fi
}
postAllResources() {
    for dir in $(ls ./${source}); do
        postAllResourcesForType ${dir}
    done
}
postAllResources
wait