fx_version 'cerulean'
game 'gta5'

name 'rwx_core'
description 'Core resource for rwx framework'
lua54 'yes'
version '0.0.1'

-- ui_page 'web/build/index.html'
ui_page 'http://localhost:5173/'

shared_scripts {
    '@ox_lib/init.lua',
    'shared/config.lua',
    'shared/lib.lua',
    'shared/functions.lua'
}

client_scripts {
    'client/main.lua'
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'server/main.lua',
    'server/functions.lua',
    'server/player.lua'
}

files {
    'shared/jobs.lua',
    'config/client.lua',
    'config/server.lua',
    'server/query.lua',
}

dependencies {
    '/server:7290',
    '/onesync',
    -- 'ox_lib',
    -- 'oxmysql'
}

files {
    'web/build/**.js',
    'web/build/**.css',
    'web/build/index.html',
}