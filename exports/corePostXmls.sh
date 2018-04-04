#!/usr/bin/env bash

source="xmls"
target=$1
nv=$2
base="http://${target}:8080/eic-registry/"

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
    if ((${response} < 200 || ${response} >= 300 )); then
        printf "[${colors}%3d\e[0m] Posting [%9s] to %9s --> %s\n" "${response}" "${2}" "${target}" "$1"
        read input </dev/tty
    fi
}
postAllResources() {
    for resourceType in $(ls ./${source}); do
        if [[ "$resourceType" == "vocabulary" && "$nv" == "nv" ]]; then
            echo "Skipping vocabulary"
        else
            postAllResourcesForType ${resourceType}
        fi
    done
}
postAllResources
wait
