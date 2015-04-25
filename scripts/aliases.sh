alias awkhelp='open https://developer.apple.com/library/mac/documentation/OpenSource/Conceptual/ShellScripting/Howawk-ward/Howawk-ward.html#//apple_ref/doc/uid/TP40004268-TP40003518-SW10'
alias refresh='. ~/.bash_profile'
alias gs='git status'
alias gd='git diff'

unset -f gf
gf() { git ls-files | awk -v pattern="$@" '$0 ~ pattern { print $0 | "/usr/bin/pbcopy"; print $0, "--- copied to clipboard"; nextfile; }';}
