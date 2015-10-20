'use strict';

var Subscriber = function Subscriber(options) {
    this.test = options.test;
    if (options.hasOwnProperty('variant')) {
        this.variant = options.variant;
    }
    this.callback = options.callback;
};

Subscriber.prototype.notify = function(test) {
    var self = this;
    setTimeout(function notifySubscriberNow() {
        self.callback(test);
    }, 1);
};

Subscriber.prototype.matchesTest = function(test) {
    return this.test === test.name;
};

Subscriber.prototype.matchesTestAndVariant = function(test, variant) {
    if (this.hasOwnProperty('variant')) {
        return this.test === test && this.variant === variant;
    }

    return this.test === test;
};

module.exports = Subscriber;
