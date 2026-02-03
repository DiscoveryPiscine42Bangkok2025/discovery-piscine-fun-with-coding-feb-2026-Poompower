#!/bin/sh

if [ $# -eq 0 ]; then
    echo "No arguments supplied"
else
    count=0
    for arg in "$@"
    do
        mkdir "$arg"
        count=$((count + 1))
        if [ $count -eq 3 ]; then
            break
        fi
    done
fi
