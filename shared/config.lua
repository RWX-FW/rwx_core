local cfg = {}

if not IsDuplicityVersion() then
    
else
    cfg.identifier = 'steam' -- steam, license
    cfg.identifierTypes = {
        stateId = {
            valueFunction = function()
                return lib.string.random('A.......')
            end,
        },
    }
    cfg.accounts = {cash = 500, bank = 5000}
    cfg.hungerRate = 5.0
    cfg.thirstRate = 5.0
end

rwx.cfg = cfg