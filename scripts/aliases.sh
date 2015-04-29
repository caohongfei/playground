# export BAIDU="/Users/hcao/BaiDuPan/LPSync"
# export RAR_PREFIX="LearnHome"
# export SCRIPT_PATH="/Users/hcao/github/playground/scripts"
# export RAR_PASS=x
# . ${SCRIPT_PATH}/aliases.sh

export HISTSIZE=99
export LANG=zh_CN.UTF-8

alias a='alias'
alias d1='d 1'
alias d2='d 2'
alias d3='d 3'
alias d4='d 4'
alias d5='d 5'
alias d6='d 6'
alias d7='d 7'
alias d8='d 8'
alias d9='d 9'
alias ll='ls -lta'
alias h='history 44'
alias e1='vi $SCRIPT_PATH/aliases.sh'
alias e2='vi ~/.bashrc'
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
        printf "%s", $1 | "/usr/bin/pbcopy"; print $1, "[37;40m--- copied to clipboard[0m"; 
        i ++;
      }
      else {
        print $1;
      }
    }';
}

unset -f bk
bk() {
  declare -a NAMES
  NAMES=('BAIDU' 'RAR_PREFIX' 'RAR_PASS')
  for n in ${NAMES[@]}; do
    if [[ ${!n} == "" ]]; then echo $n is not defined; sleep 1800; return; fi
  done
  local name=$(ls -lr $BAIDU/$RAR_PREFIX* | awk '
    {
      if (NR==1) {
        print $9;
      }
    }
  ')
  local curdir=$( cd "$( dirname "${BASH_SOURCE[1]}" )" && pwd )
  if [[ $name == "" ]]; then echo No expected file name found; sleep 1800; return; fi
  echo $curdir
  cp $name $curdir
  mv $curdir/$RAR_PREFIX*.rar $curdir/$RAR_PREFIX.rar
  unrar x -p$RAR_PASS $curdir/$RAR_PREFIX.rar Learn LastFoot $curdir/OK/
  /Applications/Beyond\ Compare.app/Contents/MacOS/BCompare "daily"
  rm -r -f $curdir/OK
  rm $curdir/$RAR_PREFIX.rar
}

unset -f d
d() {
  if [[ $MY_DIRS == "" ]]; then echo No directories defined; return; fi
  if [[ $1 == "" ]]; then
    select d in ${MY_DIRS[@]}; do
      if [[ $d != "" ]]; then cd $d; fi
      break;
    done
  else
    if [[ ! $1 =~ ^[0-9]+$ ]]; then echo Invalid directory number; return; fi
    local index=$(( $1-1 ))
    if [[ ${MY_DIRS[$index]} == "" ]]; then echo Specified directory number doesn\'t exist; return; fi
    cd ${MY_DIRS[$index]}
  fi
}

unset -f command_not_found_handle
#bash 4.0 is required for this
command_not_found_handle() {
  if [[ $1 =~ d([0-9]+) ]]; then 
    echo Redirect to \"d ${BASH_REMATCH[1]}\" 
    d ${BASH_REMATCH[1]}; 
  else 
    echo $1 - command not found
    return 127
  fi
}


