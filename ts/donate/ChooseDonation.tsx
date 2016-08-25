import * as React from "react";
import * as ReactDOM from "react-dom";
import {PaymentOptions} from "./PaymentOptions";

export interface ChooseDonationProps {
    donationAmounts: number[];
    userName: string;
}

export interface ChooseDonationState {
    selectedAmount?: number;
}



export class ChooseDonation extends React.Component<ChooseDonationProps, ChooseDonationState> {

    constructor(props: ChooseDonationProps, context: any) {
        super(props, context);
        this.state = { };
    }

    render() {

        var {donationAmounts, userName} = this.props;
        var {selectedAmount} = this.state;

        return <div className="choose-donation">

            <div id="donate-panel" className="panel panel-default">
                <div className="panel-heading">
                    <span>{userName}</span>, how much is Post To Tumblr worth to you?
                </div>
                <div className="panel-body" id="donate-panel">

                    <div>
                        { donationAmounts.map(a => <label className="donation-amount-option btn btn-default" key={a}>
                            <input type="radio" name="donationOptionGroup" checked={a == selectedAmount} value={a + ""}
                                onChange={() => this.setState({ selectedAmount: a }) }/> ${a}
                        </label>) }
                    </div>
                </div>
            </div>

            { selectedAmount > 0 ?
                <PaymentOptions amount={selectedAmount} /> 
                 : 
                 null }

        </div>;
    }
} 