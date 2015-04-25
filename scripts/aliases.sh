# export BAIDU="/Users/hcao/BaiDuPan/LPSync"
# export SCRIPT_PATH="/Users/hcao/github/playground/scripts"
# . ${SCRIPT_PATH}/aliases.sh


alias a='alias'
alias h='history'
alias e1='vi $SCRIPT_PATH/aliases.sh'
alias e2='vi ~/.bash_profile'
alias hpawk='open https://developer.apple.com/library/mac/documentation/OpenSource/Conceptual/ShellScripting/Howawk-ward/Howawk-ward.html#//apple_ref/doc/uid/TP40004268-TP40003518-SW10'
alias hpsh='open https://www.gnu.org/software/bash/manual/bash.html'
alias r='. ~/.bash_profile'
alias gs='git status'
alias gd='git diff'
alias gc='git commit -m'

unset -f gf
gf() { 
  git ls-files | awk -v pattern="$@" '
    BEGIN {
      i = 0;
    }
    $0 ~ pattern { 
      if (i == 0) {
        printf "%s", $1 | "/usr/bin/pbcopy"; print $1, "[31;46m--- copied to clipboard[0m"; 
        i ++;
      }
      else {
        print $1;
      }
    }';
}
