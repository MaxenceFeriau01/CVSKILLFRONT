#!/bin/bash

set -e

echo "Substitute env..."
envsubst < /usr/share/nginx/html/assets/js/environment.js.tmpl > /usr/share/nginx/html/assets/js/environment.js

echo "Starting nginx..."
nginx -g "daemon off;"
