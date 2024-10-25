rwx.query = {}

function rwx.query.fetchIsUnique(type, value)
    local typeToColumn = {
        stateId = 'stateId',
    }

    local result = MySQL.single.await('SELECT COUNT(*) as count FROM characters WHERE ' .. typeToColumn[type] .. ' = ?', { value })
    return result.count == 0
end