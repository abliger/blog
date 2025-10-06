echo "请先下载 vpn; 苹果用户 点击 https://install.appcenter.ms/users/clashx/apps/clashx-pro/distribution_groups/public 下载;"
echo "如果没有 vpn 请看查看购买 https://sdkdnspro.com/#/register?code=vI460IkP"
echo "输入 clashx-pro 开放的端口号"
read point

export https_proxy=127.0.0.1:$point
export http_proxy=127.0.0.1:$point

if ! command -v brew &>/dev/null; then
	echo "install brew"
	/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
else
	echo "brew installed"
fi

echo "next step enter any key or exit"
read stop
if test -e /Applications/Firefox.app; then
	echo 'firefox installed'
else
	firefox="https://download-installer.cdn.mozilla.net/pub/firefox/releases/102.9.0esr/mac/en-GB/Firefox%20102.9.0esr.dmg"
	curl $firefox -o ~/Downloads/firefox.dmg
fi

echo "next step enter any key or exit"
read stop

git config --global http.proxy 127.0.0.1:7890
git config --global https.proxy 127.0.0.1:7890

#### 开始安装 npm pnpm ####
brew install npm
brew install pnpm
npm config set registry https://registry.npmmirror.com/
pnpm config set registry https://registry.npmmirror.com/

## command
brew install node
brew install rustup-init
brew install nvim
brew install wget
## app
brew install iterm2
brew install menubarx
brew install visual-studio-code
brew install typora
brew install iina
brew install parallels

## term
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
brew install romkatv/powerlevel10k/powerlevel10k
echo "source $(brew --prefix)/opt/powerlevel10k/powerlevel10k.zsh-theme" >>~/.zshrc
brew install autojump

git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions

echo '[ -f /opt/homebrew/etc/profile.d/autojump.sh ] && . /opt/homebrew/etc/profile.d/autojump.sh' >>~/.zshrc

echo '请在 .zshrc 文件 plugs=(git) 中 添加   zsh-autosuggestions zsh-syntax-highlighting'

## nvim
if ! test -e ~/.config/nvim; then
	mkdir ~/.config/nvim
fi
git clone https://github.com/abliger/Nvim_config.git ~/.config/nvim

## command
brew install lsd
echo "alias ls='lsd' 
alias l='ls -l' 
alias la='ls -a' 
alias lla='ls -la' 
alias lt='ls --tree'
alias pip='pip3'
alias py='python3'
" >>~/.zshrc

brew install git-dalta

echo "[core]
    pager = delta

[interactive]
    diffFilter = delta --color-only

[delta]
    navigate = true    # use n and N to move between diff sections
    light = false      # set to true if you're in a terminal w/ a light background color (e.g. the default macOS terminal)
	line-numbers = true
	side-by-side = true

[merge]
    conflictstyle = diff3

[diff]
    colorMoved = default" >>~/.gitconfig

brew install rich ## show file content
brew install ripgrep

# 安装 manim
brew install py3cairo ffmpeg
brew install pango scipy
pip3 install manim
# 安装 manim 后选择安装
brew install --cask mactex-no-gui

# 自动提交 git
cargo install --locked gptcommit
