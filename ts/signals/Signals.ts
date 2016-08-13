export class SignalBinding
{
    constructor(private signal : Signal, public listener:Function, 
        public context: any)
    {        
    }

    detatch()
    {
        this.signal.remove(this);
    }
}

export class Signal {
    private bindings: SignalBinding[];

    constructor() {
        this.bindings = [];
    }

    add(listener: Function, context?: any) : SignalBinding {
        var binding = new SignalBinding(this, listener, context);
        this.bindings.push(binding);
        return binding;
    }

    remove(binding:SignalBinding) {
        this.bindings.splice(this.bindings.indexOf(binding), 1);
    }
   
    dispatch(...args: any[]) {
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

export interface Signal1<T1> extends Signal {
    add(listener: (arg1: T1) => void, context?: any) : SignalBinding;
    remove(binding:SignalBinding);
    dispatch(data: T1);
}

export interface Signal2<T1, T2> extends Signal {
    add(listener: (arg1: T1, arg2: T2) => void, context?: any) : SignalBinding;
    remove(binding:SignalBinding);
    dispatch(arg1: T1, arg2: T2);
}

export interface Signal3<T1, T2, T3> extends Signal {
    add(listener: (arg1: T1, arg2: T2, arg3: T3) => void, context?: any) : SignalBinding;
    remove(binding:SignalBinding);
    dispatch(arg1: T1, arg2: T2, arg3: T3);
}