import * as React from "react";
import * as ReactDOM from "react-dom";
import * as braintree from "braintree-web";

export interface PaymentOptionsProps {
    amount: number;
}

export interface PaymentOptionsState {
}

const auth = "eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiIzOGNlNTI2ZGU1ODFhNDViZTRhMDcyMDlmZTE4M2EzY2E0ZmU1ZWVkMjEyOTQ5Yzk1NDViYmY5Nzc3MThjZDJmfGNyZWF0ZWRfYXQ9MjAxNi0wOC0yNVQwODoxOTozMS45MzQ4Mjk4MTIrMDAwMFx1MDAyNm1lcmNoYW50X2lkPTM0OHBrOWNnZjNiZ3l3MmJcdTAwMjZwdWJsaWNfa2V5PTJuMjQ3ZHY4OWJxOXZtcHIiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvMzQ4cGs5Y2dmM2JneXcyYi9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzLzM0OHBrOWNnZjNiZ3l3MmIvY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tLzM0OHBrOWNnZjNiZ3l3MmIifSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6dHJ1ZSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiQWNtZSBXaWRnZXRzLCBMdGQuIChTYW5kYm94KSIsImNsaWVudElkIjpudWxsLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjp0cnVlLCJlbnZpcm9ubWVudCI6Im9mZmxpbmUiLCJ1bnZldHRlZE1lcmNoYW50IjpmYWxzZSwiYnJhaW50cmVlQ2xpZW50SWQiOiJtYXN0ZXJjbGllbnQzIiwiYmlsbGluZ0FncmVlbWVudHNFbmFibGVkIjp0cnVlLCJtZXJjaGFudEFjY291bnRJZCI6ImFjbWV3aWRnZXRzbHRkc2FuZGJveCIsImN1cnJlbmN5SXNvQ29kZSI6IlVTRCJ9LCJjb2luYmFzZUVuYWJsZWQiOmZhbHNlLCJtZXJjaGFudElkIjoiMzQ4cGs5Y2dmM2JneXcyYiIsInZlbm1vIjoib2ZmIn0";

export class PaymentOptions extends React.Component<PaymentOptionsProps, PaymentOptionsState> {

    constructor(props: PaymentOptionsProps, context: any) {
        super(props, context);
        this.state = {};
    }

    componentDidMount() {
        console.log("creating braintree client...");
        braintree.client.create({
            authorization: auth,
        }, (err, instance) => {
            console.log("braintree created", { err, instance });

            braintree.hostedFields.create({
                client: instance,
                styles: {
                    'input': {
                        'font-size': '14pt',
                        height: "30px"
                    },
                    'input.invalid': {
                        'color': 'red'
                    },
                    'input.valid': {
                        'color': 'green'
                    },
                },
                fields: {
                    number: {
                        selector: '#card-number',
                        placeholder: '4111 1111 1111 1111'
                    },
                    cvv: {
                        selector: '#cvv',
                        placeholder: '123'
                    },
                    expirationDate: {
                        selector: '#expiration-date',
                        placeholder: '10 / 2019'
                    }
                }
            }, function (hostedFieldsErr, hostedFieldsInstance) {
                if (hostedFieldsErr) {
                    // Handle error in Hosted Fields creation
                    return;
                }

                //submit.removeAttribute('disabled');
            });
        });
    }

    render() {

        return <div id="donate-panel" className="panel panel-default">
            <div className="panel-heading">
                Donate ${55} with
            </div>
            <div className="panel-body">
                     
                <form id="checkout-form" action="/transaction-endpoint" method="post">
                    <div id="error-message"></div>

                    <label for="card-number">Card Number</label>
                    <div class="hosted-field" id="card-number"></div>

                    <label for="cvv">CVV</label>
                    <div class="hosted-field" id="cvv"></div>

                    <label for="expiration-date">Expiration Date</label>
                    <div class="hosted-field" id="expiration-date"></div>

                    <input type="hidden" name="payment-method-nonce" />
                    <input type="submit" value="Pay $10" disabled />
                </form>
           
            </div>
        </div>
    }
} 