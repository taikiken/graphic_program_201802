# encoding: utf-8
# vim: ft=ruby expandtab shiftwidth=2 tabstop=2

require 'yaml'

Vagrant.require_version '>= 1.8'

Vagrant.configure(2) do |config|


  # config
  # ------------------------------
  _conf = YAML.load(
    File.open(
      File.join(File.dirname(__FILE__), 'provision/site.yml'),
      File::RDONLY
    ).read
  )

  # load cookbook
  # ------------------------------
  if File.exists?(_conf['chef_cookbook_path'])
    chef_cookbooks_path = _conf['chef_cookbook_path']
  elsif File.exists?(File.join(File.dirname(__FILE__), _conf['chef_cookbook_path']))
    chef_cookbooks_path = File.join(File.dirname(__FILE__), _conf['chef_cookbook_path'])
  else
    puts "Can't find "+_conf['chef_cookbook_path']+'. Please check chef_cookbooks_path in the config.'
    exit 1
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

  if 'provision' != ARGV[0]
    config.vm.provision 'shell',
        inline: 'curl -L https://www.opscode.com/chef/install.sh | sudo bash -s -- -v 11'
  end


  # pre
  # ------------------------------
  if File.exists?(File.join(File.dirname(__FILE__), 'provision-pre.sh')) then
    config.vm.provision :shell, :path => File.join( File.dirname(__FILE__), 'provision-pre.sh' )
  end



  # chef - cooking
  # ------------------------------
  config.vm.provision :chef_solo do |chef|

    # CentOS7を採用する場合は以下読み込む
    # chef.custom_config_path = "provision/Vagrantfile.chef"

    chef.cookbooks_path = [
      File.join(chef_cookbooks_path, 'cookbooks'),
      File.join(chef_cookbooks_path, 'site-cookbooks')
    ]

    chef.json = {
      :app => {
        :user     => _conf['user'],
        :group    => _conf['group'],
        :host     => _conf['hostname'],
        :docroot  => _conf['document_root'],
        :packages => %w{git subversion zip unzip kernel-devel gcc perl make jq httpd-devel libxml2-devel libcurl-devel libjpeg-turbo-devel libpng-devel giflib-devel gd-devel libmcrypt-devel libtidy-devel libxslt-devel gettext npm lftp sshpass sqlite-devel curl}
      },
      :apache => {
        :docroot_dir  => _conf['document_root'],
        :user         => _conf['user'],
        :group        => _conf['group'],
        :listen_ports => ['80', '443']
      },
      :php => {
        :packages => %w(php php-cli php-devel php-pear php-mbstring php-gd php-xml php-mysql php-pgsql php-pecl-xdebug),
        :directives => {
          'default_charset'            => 'UTF-8',
          'mbstring.language'          => 'neutral',
          'mbstring.internal_encoding' => 'UTF-8',
          'date.timezone'              => 'UTC',
          'short_open_tag'             => 'Off',
          'session.save_path'          => '/tmp',
          'upload_max_filesize'        => '32M'
        }
      },
      :postgresql => {
        :password => 'postgres',
        :pg_hba => [
          {:type => 'local', :db => 'all', :user => 'postgres', :addr => nil, :method => 'ident'},
          {:type => 'local', :db => 'all', :user => 'all', :addr => nil, :method => 'ident'},
          {:type => 'host', :db => 'all', :user => 'all', :addr => '127.0.0.1/32', :method => 'trust'},
          {:type => 'host', :db => 'all', :user => 'all', :addr => '::1/128', :method => 'trust'}
        ]
      },
      :build_essential => {
        :compiletime => true
      }
    }

    chef.add_recipe 'undotsushin'


  end

  # post
  # ------------------------------
  if File.exists?(File.join(File.dirname(__FILE__), 'provision/provision-post.sh')) then
    config.vm.provision :shell, :path => File.join( File.dirname(__FILE__), 'provision/provision-post.sh' )
  end

end
