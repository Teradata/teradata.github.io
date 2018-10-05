#!/bin/bash

# Copyright (C) 2016-2017 by Teradata Corporation. All rights reserved.
# TERADATA CORPORATION CONFIDENTIAL AND TRADE SECRET

# Only start container if all ENV vars are provided
[ -z "$APPCENTER_BASE_URL" ] && echo "Need to set APPCENTER_BASE_URL" && exit 1;

# Add a config file from env
cat <<EOF> /usr/share/nginx/html/config.js
var appConfig = {
  APP_CENTER_URL: '$APPCENTER_BASE_URL',
  APP_CENTER_SERVICES_URL: '/api/app',
  USERS_SERVICES_URL: '/api/user',
  SYSTEM_SERVICES_URL: '/api/system',
  QUERY_SERVICES_URL: '/api/query',
};
EOF

# Filter the BaseURL into nginx.conf
sed -i -e "s|APPCENTERBASEURL|$APPCENTER_BASE_URL|g" /etc/nginx/conf.d/default.conf

# Start nginx
echo "Starting nginx..."
nginx -g "daemon off;"