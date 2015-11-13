# export SCRIPT_PATH="/Users/hcao/github/playground/scripts"
# . ${SCRIPT_PATH}/aliases.sh

export HISTSIZE=99
export LC_ALL="en_US.UTF-8"
export LANG="en_US.UTF-8"

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
alias d10='d 10'
alias d11='d 11'
alias d12='d 12'
alias d13='d 13'
alias d14='d 14'
alias d15='d 15'
alias ll='ls -la'
alias h='history 44'
alias e1='vi $SCRIPT_PATH/aliases.sh'
alias e2='vi ~/.bashrc'
alias hpawk='open https://developer.apple.com/library/mac/documentation/OpenSource/Conceptual/ShellScripting/Howawk-ward/Howawk-ward.html#//apple_ref/doc/uid/TP40004268-TP40003518-SW10'
alias hpsh='open https://www.gnu.org/software/bash/manual/bash.html'
alias hpguava='open https://code.google.com/p/guava-libraries/wiki/GuavaExplained'
alias hpnet='open https://developer.apple.com/library/ios/documentation/NetworkingInternetWeb/Conceptual/NetworkingOverview/CommonPitfalls/CommonPitfalls.html'
alias hpswift='open http://swiftdoc.org/'
alias r='. ~/.bash_profile'
alias gs='git status'
alias gd='clear;git diff'
alias gp='git pull'
alias gc='git commit -m'
alias gl='git log --decorate'
alias dbh='ssh -t huangshan "mysql -u gcapp -p"'
alias dbc='ssh -t changbaishan "mysql -u gcapp -p"'
alias dbx='ssh -t 192.168.2.198  "mysql -u gcapp -p"'
alias gw='gradle war'
alias gcp='gradle copyDependencies'
alias gsb='gradle syncBack'
alias gstat='/Users/hcao/Documents/gitinspector-0.3.2/gitinspector/gitinspector.py -f java,c,cpp,h,hpp,py,glsl,rb,js,sql,html,css'
alias pjs='$PJS_HOME/bin/phantomjs'
alias sshbwh='ssh root@bwh -p 29356'

unset -f gf
gf() { 
  git ls-files | awk -v pattern="$@" '
    BEGIN {
      i = 0;
    }
    tolower($0) ~ pattern {
      if (i == 0) {
        printf "%s", $1 | "/usr/bin/pbcopy"; print $1, "[37;40m--- copied to clipboard[0m"; 
        i ++;
      }
      else {
        print $1;
      }
    }';
}

unset -f check_required
check_required() {
  declare -a array=("${!1}")
  for n in ${array[@]}; do
    if [[ ${!n} == "" ]]; then echo $n is not defined; return 56; fi
  done
}

unset -f pk
pk() {
  NAMES=('BAIDU' 'RAR_SOURCE' 'RAR_PREFIX_PK' 'RAR_PASS')
  if ! check_required NAMES[@]; then return; fi
  local olddir=$PWD
  cd $RAR_SOURCE
  now=$(date +"%Y-%m-%d-%H-%M")
  file="$RAR_PREFIX_PK$now.rar"
  echo "Starting back up to $file..."
  rar a -hp$RAR_PASS -xLearn/00 -xLearn/VOA -xLearn/bpics -xLearn/pics -xLearn/bsnds -xLastFoot/jscripts -xLastFoot/images -xLastFoot/sounds -xLastFoot/videos -xLastFoot/html -xLastFoot/picauds -xLastFoot/TiddlySaver.jar -xLearn/TiddlySaver.jar -x*.DS_Store "$file" Learn LastFoot
  mv "$file" $BAIDU
  cd $olddir 
}

unset -f unpk
unpk() {
  NAMES=('BAIDU' 'RAR_PREFIX_UNPK' 'RAR_PASS' 'RAR_TEMP')
  if ! check_required NAMES[@]; then return; fi
  local name=$(ls -lr $BAIDU/$RAR_PREFIX_UNPK* | awk '
    {
      if (NR==1) {
        print $9;
      }
    }
  ')
  local curdir=$RAR_TEMP
#  local curdir=$( cd "$( dirname "${BASH_SOURCE[1]}" )" && pwd )
#  if [[ $name == "" ]]; then echo No expected file name found; sleep 1800; return; fi
  echo $curdir
  cp $name $curdir
  mv $curdir/$RAR_PREFIX_UNPK*.rar $curdir/$RAR_PREFIX_UNPK.rar
  unrar x -p$RAR_PASS $curdir/$RAR_PREFIX_UNPK.rar Learn LastFoot $curdir/OK/
  /Applications/Beyond\ Compare.app/Contents/MacOS/BCompare "daily"
  rm -r -f $curdir/OK
  rm $curdir/$RAR_PREFIX_UNPK.rar
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
    echo $1 - command not found / Hongfei Cao
    return 127
  fi
}

unset -f tg
tg() {
  if [[ $1 == "" ]]; then echo Please specify the tag\'s name; return 127; fi
  if git status  > /dev/null 2>&1; then
    git tag $1;
    git push origin $1;
    OLDDIR=$PWD
    until ! git status > /dev/null 2>&1; do LASTDIR="`basename $PWD`"; cd ..; done 
    echo $LASTDIR has been tagged with $1
    cd $OLDDIR
  else
    echo The current directory is not a git directory;
  fi
}
