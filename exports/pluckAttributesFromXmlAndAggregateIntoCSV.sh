#!/usr/bin/env bash

out="id\tname\tcategory\tsubcategory"

for service in $1/*
do
    id=$(xmllint --xpath "//*[local-name()='id']/text()" ${service})
    name=$(xmllint --xpath "//*[local-name()='name']/text()" ${service})
    category=$(xmllint --xpath "//*[local-name()='category']/text()" ${service})
    subcategory=$(xmllint --xpath "//*[local-name()='subcategory']/text()" ${service})
    out="$out\n$id\t$name\t$category\t$subcategory"
done

printf "${out}"