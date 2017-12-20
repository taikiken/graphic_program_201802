# -*- mode: ruby -*-
# vi: set ft=ruby :

require 'yaml'

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  # config
  # ------------------------------
  _conf = YAML.load(
    File.open(
      File.join(File.dirname(__FILE__), 'provision/site.yml'),
      File::RDONLY
    ).read
  )

  # profile
  # ------------------------------
  if File.exists?(File.join(File.dirname(__FILE__), 'provision/profile.yml'))
    _site = YAML.load(
      File.open(
        File.join(File.dirname(__FILE__), 'provision/profile.yml'),
        File::RDONLY
      ).read
    )
    _conf.merge!(_site) if _site.is_a?(Hash)
  end


  # set conf
  # ------------------------------
  config.vm.define _conf['hostname'] do |v|
  end

  config.vm.box = ENV['box'] || _conf['box']
  config.ssh.forward_agent = true

  config.vm.box_check_update = true

  config.vm.hostname = _conf['hostname']
  config.vm.network :private_network, ip: _conf['ip']
  config.vm.network :forwarded_port, guest: 80, host: 8080
  config.vm.network :forwarded_port, guest: 80, host: 8888

  # sync
  # ------------------------------
  # config.vm.synced_folder "./", "/var/www/html"

  config.vm.synced_folder ".", "/vagrant", :mount_options => ['dmode=755', 'fmode=644']
  config.vm.synced_folder _conf['sync_folder'], _conf['document_root'], :create => "true", :mount_options => ['dmode=755', 'fmode=644']


  # plugins
  # ------------------------------
  if Vagrant.has_plugin?('vagrant-hostsupdater')
    config.hostsupdater.remove_on_suspend = true
  end

  if Vagrant.has_plugin?('vagrant-vbguest')
    config.vbguest.auto_update = true
  end



  # vb
  # ------------------------------
  config.vm.provider :virtualbox do |vb|
    vb.linked_clone = _conf['linked_clone']
    vb.name = _conf['hostname']
    vb.memory = _conf['memory'].to_i
    vb.cpus = _conf['cpus'].to_i
    if 1 < _conf['cpus'].to_i
      vb.customize ['modifyvm', :id, '--ioapic', 'on']
    end
    vb.customize ['modifyvm', :id, '--natdnsproxy1', 'on']
    vb.customize ['modifyvm', :id, '--natdnshostresolver1', 'on']
  end

  # Share an additional folder to the guest VM. The first argument is the path on the host to the actual folder.
  # The second argument is the path on the guest to mount the folder.
  # config.vm.synced_folder "./", "/var/www/html"

  # Define the bootstrap file: A (shell) script that runs after first setup of your box (= provisioning)
  config.vm.provision :shell, path: "bootstrap.sh"



  # post
  # ------------------------------
  if File.exists?(File.join(File.dirname(__FILE__), 'provision/provision-post.sh')) then
    config.vm.provision :shell, :path => File.join( File.dirname(__FILE__), 'provision/provision-post.sh' )
  end



  # push
  # ------------------------------
  # $ vagrant push db_import
  config.push.define "db_import", strategy: "local-exec" do |push|
    push.inline = <<-SCRIPT
      vagrant ssh -c "cd /vagrant && sudo -u postgres dropdb ut && sudo -u postgres createdb ut && sudo -u postgres psql -h localhost -U ut -d ut < ut.dump;"
    SCRIPT
  end

  # $ vagrant push dev - t2.small の dev.sportsbull.jp
  config.push.define "dev", strategy: "local-exec" do |push|
    push.inline = <<-SCRIPT
      rsync -vrt --chmod=Dug=rwx,Dg+s,Do=rx,Fu=rw,Fg=rw,Fo=r --perms --progress --delete --exclude='.DS_Store' ./app #{_conf['ssh_user']}@#{_conf['ssh_host']}:/var/www/sportsbull.jp/dev/
      rsync -vrt --chmod=Dug=rwx,Dg+s,Do=rx,Fu=rw,Fg=rw,Fo=r --perms --progress --delete --exclude='.DS_Store' ./public/about #{_conf['ssh_user']}@#{_conf['ssh_host']}:/var/www/sportsbull.jp/dev/public/
      rsync -vrt --chmod=Dug=rwx,Dg+s,Do=rx,Fu=rw,Fg=rw,Fo=r --perms --progress --delete --exclude='.DS_Store' ./public/picks #{_conf['ssh_user']}@#{_conf['ssh_host']}:/var/www/sportsbull.jp/dev/public/
      rsync -vrt --chmod=Dug=rwx,Dg+s,Do=rx,Fu=rw,Fg=rw,Fo=r --perms --progress --delete --exclude='.DS_Store' ./public/w_samurai #{_conf['ssh_user']}@#{_conf['ssh_host']}:/var/www/sportsbull.jp/dev/public/
      rsync -vrt --chmod=Dug=rwx,Dg+s,Do=rx,Fu=rw,Fg=rw,Fo=r --perms --progress --delete --exclude='.DS_Store' ./public/assets #{_conf['ssh_user']}@#{_conf['ssh_host']}:/var/www/sportsbull.jp/dev/public/
      rsync -vrt --chmod=Dug=rwx,Dg+s,Do=rx,Fu=rw,Fg=rw,Fo=r --perms --progress --delete --exclude='.DS_Store' ./public/motorsports #{_conf['ssh_user']}@#{_conf['ssh_host']}:/var/www/sportsbull.jp/dev/public/
      vagrant ssh -c "bash /vagrant/provision/s3/cmd.sh dev"
    SCRIPT
  end

  # $ vagrant push stg - t2.small の stg.sportsbull.jp
  config.push.define "stg", strategy: "local-exec" do |push|
    push.inline = <<-SCRIPT
      rsync -vrt --chmod=Dug=rwx,Dg+s,Do=rx,Fu=rw,Fg=rw,Fo=r --perms --progress --delete --exclude='.DS_Store' ./app #{_conf['ssh_user']}@#{_conf['ssh_host']}:/var/www/sportsbull.jp/stg/
      rsync -vrt --chmod=Dug=rwx,Dg+s,Do=rx,Fu=rw,Fg=rw,Fo=r --perms --progress --delete --exclude='.DS_Store' ./public/about #{_conf['ssh_user']}@#{_conf['ssh_host']}:/var/www/sportsbull.jp/stg/public/
      rsync -vrt --chmod=Dug=rwx,Dg+s,Do=rx,Fu=rw,Fg=rw,Fo=r --perms --progress --delete --exclude='.DS_Store' ./public/picks #{_conf['ssh_user']}@#{_conf['ssh_host']}:/var/www/sportsbull.jp/stg/public/
      rsync -vrt --chmod=Dug=rwx,Dg+s,Do=rx,Fu=rw,Fg=rw,Fo=r --perms --progress --delete --exclude='.DS_Store' ./public/w_samurai #{_conf['ssh_user']}@#{_conf['ssh_host']}:/var/www/sportsbull.jp/stg/public/
      rsync -vrt --chmod=Dug=rwx,Dg+s,Do=rx,Fu=rw,Fg=rw,Fo=r --perms --progress --delete --exclude='.DS_Store' ./public/assets #{_conf['ssh_user']}@#{_conf['ssh_host']}:/var/www/sportsbull.jp/stg/public/
      rsync -vrt --chmod=Dug=rwx,Dg+s,Do=rx,Fu=rw,Fg=rw,Fo=r --perms --progress --delete --exclude='.DS_Store' ./public/motorsports #{_conf['ssh_user']}@#{_conf['ssh_host']}:/var/www/sportsbull.jp/stg/public/
      vagrant ssh -c "bash /vagrant/provision/s3/cmd.sh stg"
    SCRIPT
  end


  # $ vagrant push www - 本番サーバのsportsbull領域
  # cmsのファイルr内容は web01/web02 に自動的に同期される
  config.push.define "www", strategy: "local-exec" do |push|
    push.inline = <<-SCRIPT
      rsync -vrt --chmod=Dug=rwx,Dg+s,Do=rx,Fu=rw,Fg=rw,Fo=r --perms --progress --delete --exclude='.DS_Store' ./app #{_conf['ssh_user']}@#{_conf['ssh_host_cms']}:/var/www/sportsbull.jp/www/
      rsync -vrt --chmod=Dug=rwx,Dg+s,Do=rx,Fu=rw,Fg=rw,Fo=r --perms --progress --delete --exclude='.DS_Store' ./public/about #{_conf['ssh_user']}@#{_conf['ssh_host_cms']}:/var/www/sportsbull.jp/www/public/
      rsync -vrt --chmod=Dug=rwx,Dg+s,Do=rx,Fu=rw,Fg=rw,Fo=r --perms --progress --delete --exclude='.DS_Store' ./public/picks #{_conf['ssh_user']}@#{_conf['ssh_host_cms']}:/var/www/sportsbull.jp/www/public/
      rsync -vrt --chmod=Dug=rwx,Dg+s,Do=rx,Fu=rw,Fg=rw,Fo=r --perms --progress --delete --exclude='.DS_Store' ./public/w_samurai #{_conf['ssh_user']}@#{_conf['ssh_host_cms']}:/var/www/sportsbull.jp/www/public/
      rsync -vrt --chmod=Dug=rwx,Dg+s,Do=rx,Fu=rw,Fg=rw,Fo=r --perms --progress --delete --exclude='.DS_Store' ./public/assets #{_conf['ssh_user']}@#{_conf['ssh_host_cms']}:/var/www/sportsbull.jp/www/public/
      rsync -vrt --chmod=Dug=rwx,Dg+s,Do=rx,Fu=rw,Fg=rw,Fo=r --perms --progress --delete --exclude='.DS_Store' ./public/motorsports #{_conf['ssh_user']}@#{_conf['ssh_host_cms']}:/var/www/sportsbull.jp/www/public/
      vagrant ssh -c "bash /vagrant/provision/s3/cmd.sh prod"
    SCRIPT
  end


end
