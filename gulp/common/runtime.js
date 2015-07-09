var watching = false;

module.exports = {
    setWatching: function () {
        watching = true;
    },
    isWatching: function() {
        return watching;
    }
};
