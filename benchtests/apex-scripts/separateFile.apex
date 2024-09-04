GovernorLimits initialLimits = (new GovernorLimits()).getCurrentGovernorLimits();

OverrideBase base = new OverrideSuper();
base.entry();

GovernorLimits finalLimits = (new GovernorLimits()).getCurrentGovernorLimits();
GovernorLimits limitsDiff = (new GovernorLimits()).getLimitsDiff(initialLimits, finalLimits);

System.assert(false, '-_' + JSON.serialize(limitsDiff) + '_-');