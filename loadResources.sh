#!/bin/bash
verbose="--write-out \%\{http\_code\} --silent --output /dev/null"
function json {
    cat $1 | python -c 'import json,sys; print(json.dumps(sys.stdin.read()))'
}
vocabs=(category country language phase subcategory technologyreadinesslevel)
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
        resourceType=$(basename $1 ".res")
        for i in "${vocabs[@]}"; do
            if [[ ${i} == ${resourceType} ]]; then
                resourceType="vocabulary"
                break
            fi
        done
        response=$(curl -X POST --write-out %{http_code} --silent --output POST/$(basename ${file}) --data @${file} --header "Content-Type:application/xml" http://$2:8080/eic-registry/${resourceType})
        if ((${response} >= 200 && ${response} < 300 )); then
            colors="\e[32m"
        else
            colors="\e[31m"
        fi
        printf "[${colors}%3d\e[0m] Posting [%9s] to %9s --> %s\n" "${response}" "$(basename $1 ".res")" "$2" "$(basename ${file})"
        if ((${response} < 200 || ${response} >= 300 )); then
            read input </dev/tty
        fi
    done
}
for dir in `ls -d ./transformed/*.res/`; do
    load_resource ${dir} $1 &
done
wait
