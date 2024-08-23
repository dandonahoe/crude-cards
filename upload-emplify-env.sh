#!/bin/sh

{
    echo "option_settings:"
    echo "  aws:elasticbeanstalk:application:environment:"
    sed -e 's/^[ \t]*//;s/[ \t]*$//' -e '/^[ \t]*#/d' -e '/^$/d' -e '/██/d' -e '/https:\/\//d' -e '/----/d' .env | while read -r line; do
        key="${line%=*}"   # Extract key (before the =)
        value="${line#*=}" # Extract value (after the =)
        echo "    ${key}: ${value}"
    done
} >.ebextensions/options.config
