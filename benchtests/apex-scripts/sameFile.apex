GovernorLimits initialLimits = (new GovernorLimits()).getCurrentGovernorLimits();

OverrideTest.OverrideBase base = new OverrideTest.OverrideSuper();
base.entry();

GovernorLimits finalLimits = (new GovernorLimits()).getCurrentGovernorLimits();
GovernorLimits limitsDiff = (new GovernorLimits()).getLimitsDiff(initialLimits, finalLimits);

System.assert(false, '-_' + JSON.serialize(limitsDiff) + '_-');