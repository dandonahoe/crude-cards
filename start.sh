#!/bin/sh

# Start the Cloud SQL Auth Proxy in the background

./cloud_sql_proxy -instances="${NSTANCE_CONNECTION_NAME}"=tcp:5432 &

# Wait for the Cloud SQL Auth Proxy to start
sleep 5

# Start the main application
exec "$@"
