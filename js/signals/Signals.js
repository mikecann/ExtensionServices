export class SignalBinding {
    constructor(signal, listener, context) {
        this.signal = signal;
        this.listener = listener;
        this.context = context;
    }
    detatch() {
        this.signal.remove(this);
    }
}
export class Signal {
    constructor() {
        this.bindings = [];
    }
    add(listener, context) {
        var binding = new SignalBinding(this, listener, context);
        this.bindings.push(binding);
        return binding;
    }
    remove(binding) {
        this.bindings.splice(this.bindings.indexOf(binding), 1);
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
