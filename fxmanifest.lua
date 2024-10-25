fx_version 'cerulean'
game 'gta5'

name 'rwx_core'
lua54 'yes'

shared_scripts {
    '@ox_lib/init.lua',
    'shared/lib.lua',
    'shared/config.lua'
}

client_scripts{
    'client/main.lua'
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'server/main.lua',
}