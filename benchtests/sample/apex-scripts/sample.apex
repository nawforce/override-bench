GovernorLimits initialLimits = (new GovernorLimits()).getCurrentGovernorLimits();

Integer j=1;
for(Integer i=0; i<_count_; i++)
    j = j + 1;

GovernorLimits finalLimits = (new GovernorLimits()).getCurrentGovernorLimits();
GovernorLimits limitsDiff = (new GovernorLimits()).getLimitsDiff(initialLimits, finalLimits);

System.assert(false, '-_' + JSON.serialize(limitsDiff) + '_-');