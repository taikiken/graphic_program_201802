default[:app][:user] = 'vagrant'
default[:app][:group] = 'vagrant'
default[:app][:host] = "app.local"
default[:app][:docroot] = "/var/www/html"
default[:app][:packages] = %w{git subversion zip unzip kernel-devel gcc perl make jq httpd-devel libxml2-devel libcurl-devel libjpeg-turbo-devel libpng-devel giflib-devel gd-devel libmcrypt-devel libtidy-devel libxslt-devel gettext npm lftp sshpass sqlite-devel curl imagemagick}