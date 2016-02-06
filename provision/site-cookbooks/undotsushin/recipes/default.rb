# encoding: utf-8
# vim: ft=ruby expandtab shiftwidth=2 tabstop=2

require 'shellwords'


# yum
include_recipe "yum::remi"


# packages
node[:app][:packages].each do |pkg|
  package pkg do
    action [:install, :upgrade]
  end
end


# php
include_recipe 'php::package'



# cookbook - postgresql
include_recipe 'postgresql::server'
include_recipe 'postgresql::client'
include_recipe 'postgresql::contrib'



# cookbook - apache
include_recipe 'apache2'
include_recipe 'apache2::mod_php5'
include_recipe 'apache2::mod_ssl'


#
# Setup
#
include_recipe 'undotsushin::setup'


# npm
# execute "npm install -g gulp" do
#   user "root"
#   group "root"
# end


# gem
# execute "gem install sass" do
#  user "root"
#  group "root"
# end