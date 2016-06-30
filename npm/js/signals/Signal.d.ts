export interface SignalBinding {
    listener: Function;
    context: any;
}
export declare class Signal {
    private bindings;
    constructor();
    add(listener: Function, context?: any): SignalBinding;
    remove(binding: SignalBinding): void;
    dispatch(...args: any[]): void;
    removeAll(): void;
    count(): number;
}
export interface Signal1<T1> extends Signal {
    add(listener: (arg1: T1) => void, context: any): SignalBinding;
    remove(binding: SignalBinding): any;
    dispatch(data: T1): any;
}
export interface Signal2<T1, T2> extends Signal {
    add(listener: (arg1: T1, arg2: T2) => void, context: any): SignalBinding;
    remove(binding: SignalBinding): any;
    dispatch(arg1: T1, arg2: T2): any;
}
export interface Signal3<T1, T2, T3> extends Signal {
    add(listener: (arg1: T1, arg2: T2, arg3: T3) => void, context: any): SignalBinding;
    remove(binding: SignalBinding): any;
    dispatch(arg1: T1, arg2: T2, arg3: T3): any;
}
