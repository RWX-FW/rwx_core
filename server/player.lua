local cfg = rwx.cfg

function CheckPlayerData(source, playerData)
    playerData = playerData or {}

    local playerState = Player(source)?.state
    local Offline = true
    if source then
        playerData.source = source
        playerData.identifier = playerData.identifier or GetPlayerIdentifierByType(source, 'steam')
        playerData.name = GetPlayerName(source)
        Offline = false
    end
    playerData.stateId = playerData.stateId or GenerateUniqueIdentifier('stateId')
    playerData.userId = playerData.charinfo?.userId or playerData.cid or 1
    playerData.accounts = playerData.accounts or {}

    for k, v in pairs(cfg.accounts) do
        playerData.accounts[k] = playerData.accounts[k] or v
    end

    if playerState then
        playerState:set('status', playerData.status, true)
    end

    playerData.firstName = playerData.firstName or 'Firstname'
    playerData.lastName = playerData.lastName or 'Lastname'
    playerData.dob = playerData.dob or '00-00-0000'
    playerData.gender = playerData.gender or 0
end

function GenerateUniqueIdentifier(type)
    local isUnique, uniqueId
    local tb = cfg.identifierTypes[type]
    repeat
        uniqueId = tb.valueFunction()
        isUnique = rwx.query.fetchIsUnique(type, uniqueId)
    until isUnique
    return uniqueId
end exports('GenerateUniqueIdentifier', GenerateUniqueIdentifier)