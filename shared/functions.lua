local jobs = require('shared.jobs')

function rwx.GetJob(name)
    return jobs[name]
end exports('GetJob', rwx.GetJob)