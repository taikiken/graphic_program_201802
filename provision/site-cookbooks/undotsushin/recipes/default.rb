# encoding: utf-8
# vim: ft=ruby expandtab shiftwidth=2 tabstop=2

require 'shellwords'

include_recipe "yum::remi"
include_recipe 'php::package'

packages = %w{git subversion zip unzip kernel-devel gcc perl make jq httpd-devel libxml2-devel libcurl-devel libjpeg-turbo-devel libpng-devel giflib-devel gd-devel libmcrypt-devel libtidy-devel libxslt-devel}

packages.each do |pkg|
  package pkg do
    action [:install, :upgrade]
  end
end


packages = %w{gettext npm lftp sshpass sqlite-devel}

packages.each do |pkg|
  package pkg do
    action [:install, :upgrade]
  end
end


include_recipe 'postgresql::server'
include_recipe 'postgresql::client'
include_recipe 'postgresql::contrib'

include_recipe 'apache2'
include_recipe 'apache2::mod_php5'
include_recipe 'apache2::mod_ssl'


#
# Setup node
#
# execute "npm install -g gulp" do
#   user "root"
#   group "root"
# end


#
# Setup gem
#
# execute "gem install sass" do
#  user "root"
#  group "root"
# end

