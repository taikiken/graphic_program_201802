# encoding: utf-8
# vim: ft=ruby expandtab shiftwidth=2 tabstop=2

require 'shellwords'

service "iptables" do
  supports :status => true, :restart => true
  action [:disable, :stop]
end

# apache
# ------------------------------
apache_site "000-default" do
  enable false
end

web_app "app" do
  template "app.conf.erb"
  docroot node[:app][:docroot]
  server_name node[:fqdn]
end


# ssl
# ------------------------------
bash "create-ssl-keys" do
  user "root"
  group "root"
  cwd File.join(node[:apache][:dir], 'ssl')
  code <<-EOH
    openssl genrsa -out server.key 2048
    openssl req -new -key server.key -sha256 -subj '/C=JP/ST=Wakayama/L=Kushimoto/O=My Corporate/CN=#{node[:fqdn]}' -out server.csr
    openssl x509 -in server.csr -days 365 -req -signkey server.key > server.crt
  EOH
  notifies :restart, "service[apache2]"
end


# postgress
# ------------------------------
include_recipe "database::postgresql"

postgresql_database 'ut' do
  connection(
    :host     => '127.0.0.1',
    :port     => 5432,
    :username => 'postgres',
    :password => node['postgresql']['password']['postgres']
  )
  template 'DEFAULT'
  encoding 'DEFAULT'
  tablespace 'DEFAULT'
  connection_limit '-1'
  owner 'postgres'
  action :create
end
