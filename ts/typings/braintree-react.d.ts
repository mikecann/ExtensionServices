declare module "braintree-react"
{
    import React = __React;

    interface DropInProps extends React.HTMLProps<DropIn> {
        braintree: any;
        clientToken: string;
        onPaymentMethodReceived?: Function;
        onReady?: Function;
        rootClassName?: string;
    }
    type DropIn = React.ClassicComponent<DropInProps, {}>;
    export var DropIn: React.ClassicComponentClass<DropInProps>;
}