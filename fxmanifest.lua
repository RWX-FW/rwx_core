fx_version 'cerulean'
game 'gta5'

name 'rwx_core'
description 'Core resource for rwx framework'
lua54 'yes'
version '0.0.1'

shared_scripts {
    '@ox_lib/init.lua',
    'shared/lib.lua',
    'shared/config.lua'
}

client_scripts {
    'client/main.lua'
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'server/main.lua',
}

dependencies {
    '/server:7290',
    '/onesync',
    'ox_lib',
    'oxmysql'
}