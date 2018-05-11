#!/usr/bin/env bash

for service in $1/*
do
    name=$(xmllint --xpath "//*[local-name()='id']/text()" ${service})
    mv $service $1/$name.xml
done