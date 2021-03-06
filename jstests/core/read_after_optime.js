// Test that attempting to read after optime fails if replication is not enabled.

(function() {
"use strict";

var currentTime = new Date();

var futureOpTime = new Timestamp((currentTime / 1000 + 3600), 0);

var res = assert.commandFailed(db.runCommand({
    find: 'user',
    filter: { x: 1 },
    after: {
        opTime: { ts: futureOpTime, term: 0 }
    }
}));

assert.eq(123, res.code); // ErrorCodes::NotAReplicaSet
assert.eq(null, res.waitedMS);

})();

