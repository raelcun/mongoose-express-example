Vagrant.configure("2") do |config|
  config.vm.box = "scotch/box"

  config.vm.network "forwarded_port", guest: 3000, host: 3000

  config.vm.network "private_network", ip: "192.168.33.2"

  config.vm.provider "virtualbox" do |vb|
    vb.memory = 1024
    vb.cpus = 4
  end

  config.vm.provision "fix-no-tty", type: "shell" do |s|
    s.privileged = false
    s.inline = "sudo sed -i '/tty/!s/mesg n/tty -s \\&\\& mesg n/' /root/.profile"
  end
  
  config.vm.provision "shell", inline: <<-SHELL
  #   enter shell commands here
  #   sudo apt-get install -y apache2
  SHELL
end
