import * as React from "react";
import * as ReactDOM from "react-dom";
import {DonateWithBraintree} from "./DonateWithBraintree";

export interface ChooseDonationProps {
    donationAmounts: number[];
    userName: string;
    onAmountChanged: (amount:number)=>void;
}

export interface ChooseDonationState {
    selectedAmount?: number;
}

export class ChooseDonation extends React.Component<ChooseDonationProps, ChooseDonationState> {

    constructor(props: ChooseDonationProps, context: any) {
        super(props, context);
        this.state = { };
    }

    private onAmountChanged(a:number)
    {
        this.setState({ selectedAmount: a });
        this.props.onAmountChanged(a);
    }

    render() {

        var {donationAmounts, userName, onAmountChanged} = this.props;
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
                                onChange={() => this.onAmountChanged(a) }/> ${a}
                        </label>) }
                    </div>
                </div>
            </div>

            { selectedAmount > 0 ? this.props.children : null }

        </div>;
    }
} 