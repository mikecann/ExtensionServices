import * as React from "react";
import * as ReactDOM from "react-dom";
import * as braintree from "braintree-web";

export interface PaymentOptionsProps {
    amount: number;
    paymentToken: string;
    onPaymentMethodReceived?: (nonce: string) => void;
    onPaymentDetailsSubmit?: () => void;
}

export interface PaymentOptionsState {
    isBraintreeLoading?: boolean;
    isDonating?: boolean;
    isSubmittingPaymentDetails?: boolean;
}

export class DonateWithBraintree extends React.Component<PaymentOptionsProps, PaymentOptionsState> {

    constructor(props: PaymentOptionsProps, context: any) {
        super(props, context);
        this.state = {
            isBraintreeLoading: true
        };
    }

    componentDidMount() {
        console.log("creating braintree client...");
        const {paymentToken} = this.props;
        this.setState({ isBraintreeLoading: true });
        braintree.setup(paymentToken, "dropin", {
            container: "dropin-container",
            paypal: {
                singleUse: true,
                amount: 10.00,
                currency: 'USD'
            },
            onError: err => this.onError(err),
            onReady: data => this.onBraintreeReady(data),
            onPaymentMethodReceived: data => this.onPaymentMethodReceived(data)
        });
    }

    private onError(err: any) {
        console.log("Braintree onError", { err });
    }

    private onBraintreeReady(data: any) {
        console.log("Braintree onBraintreeReady", { data });
        this.setState({ isBraintreeLoading: false });
    }

    private onPaymentMethodReceived(data: any) {
        var nonce = data.nonce;
        console.log("Braintree onPaymentMethodReceived", { data, nonce });
        this.setState({isSubmittingPaymentDetails: false});
        if (this.props.onPaymentMethodReceived)
            this.props.onPaymentMethodReceived(nonce);
    }

    private onPaymentSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log("Braintree Submitting payment..");
        this.setState({isSubmittingPaymentDetails: true});
        if (this.props.onPaymentDetailsSubmit)
            this.props.onPaymentDetailsSubmit();        
    }

    render() {
        const {amount} = this.props;
        const {isBraintreeLoading} = this.state;
        return <div>
            {isBraintreeLoading ? <div>Loading Secure Payments Provider...</div> : null}
            <form onSubmit={e => this.onPaymentSubmit(e) }>
                <div id="dropin-container"></div>
                <input id="amount" type="hidden" value={amount} />
                { this.renderSubmitButton() }
            </form>
        </div>
    }

    renderSubmitButton() {
        const {isBraintreeLoading, isSubmittingPaymentDetails} = this.state;

        if (isBraintreeLoading)
            return null;
        
        if (isSubmittingPaymentDetails)
            return <button className="btn btn-success donate disabled" disabled="disabled" type="submit">Donate</button>
        
        return <button className="btn btn-success donate" type="submit">Donate</button>;
    }
} 