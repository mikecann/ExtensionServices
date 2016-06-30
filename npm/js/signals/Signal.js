"use strict";
class Signal {
    constructor() {
        this.bindings = [];
    }
    add(listener, context) {
        var binding = { listener: listener, context: context };
        this.bindings.push(binding);
        return binding;
    }
    remove(binding) {
        if (binding != null)
            this.bindings.splice(this.bindings.indexOf(binding), 1);
        console.log("bindings remainging: " + this.bindings.length);
    }
    dispatch(...args) {
        this.bindings.forEach(b => {
            b.listener.apply(b.context, args);
        });
    }
    removeAll() {
        this.bindings = [];
    }
    count() {
        return this.bindings.length;
    }
}
exports.Signal = Signal;
