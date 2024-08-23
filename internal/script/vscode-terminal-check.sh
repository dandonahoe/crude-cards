#!/bin/bash

echo "Ensuring the parent terminal was not started by VS Code..."

echo "Started via: ($TERM_PROGRAM)"

if [[ "$TERM_PROGRAM" == "vscode" ]]; then

    echo "This script must be run in a terminal outside VS Code."

    exit 1
fi

echo "...all good."

exit 0
poledark
