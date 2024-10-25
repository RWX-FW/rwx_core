return {
    identifier = 'steam', -- steam, license
    identifierTypes = {
        stateId = {
            valueFunction = function()
                return lib.string.random('A.......')
            end,
        },
    },
    accounts = {cash = 500, bank = 5000},
    hungerRate = 5.0,
    thirstRate = 5.0,
    stressRate = 5.0
}