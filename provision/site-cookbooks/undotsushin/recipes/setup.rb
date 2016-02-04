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


postgresql_connection_info = {
  :host => "127.0.0.1",
  :port => node['postgresql']['config']['port'],
  :username => 'postgres',
  :password => node['postgresql']['password']['postgres']
}


# ユーザー作成
postgresql_database_user "ut" do
  connection postgresql_connection_info
  password 'ut'
  superuser true
  login true
  action :create
end


# DB作成
postgresql_database 'ut' do
  connection postgresql_connection_info
  template 'DEFAULT'
  encoding 'DEFAULT'
  tablespace 'DEFAULT'
  connection_limit '-1'
  owner 'ut'
  action :create
end

# ユーザー権限設定
# grant all privileges on all tables in foo db
postgresql_database_user 'ut' do
  connection postgresql_connection_info
  database_name 'ut'
  privileges [:all]
  action :grant
end
