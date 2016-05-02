"use strict";
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
class ErrorReportView extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            email: props.userEmail
        };
    }
    reportError() {
        this.setState({ saving: true, error: null });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.userEmail != this.props.userEmail)
            this.setState({ email: nextProps.userEmail });
        if (nextProps.logs != this.props.logs)
            this.setState({ logStr: JSON.stringify(nextProps.logs) });
    }
    validationState() {
        return this.isEmailValid(this.state.email) ? 'success' : 'error';
    }
    isSendButtonDisabled() {
        return !this.isEmailValid(this.state.email) || this.state.saving;
    }
    onCommentsChange(event) {
        this.setState({
            comments: event.target.value
        });
    }
    onEmailChange(event) {
        this.setState({
            email: event.target.value
        });
    }
    isEmailValid(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }
    render() {
        var count = 0;
        return React.createElement("div", null, React.createElement("div", {className: "section log-section"}, React.createElement("div", {className: "form-group"}, React.createElement("label", {htmlFor: "logReportTextArea"}, "Logs: "), React.createElement("textarea", {id: "logReportTextArea", className: "form-control", readOnly: true, value: this.state.logStr}))), React.createElement("div", {className: "section comments-section"}, React.createElement("div", {className: "form-group"}, React.createElement("label", {htmlFor: "commentsArea"}, "Comments: "), React.createElement("textarea", {id: "commentsArea", className: "form-control", readOnly: this.state.saving || this.state.sent, value: this.state.comments, onChange: this.onCommentsChange.bind(this), placeholder: "Please be as detailed as possible, it helps me to figure out what went wrong :)"}))), React.createElement("div", {className: "section email-section"}, React.createElement("div", {className: "form-group"}, React.createElement(react_bootstrap_1.Input, {type: "email", label: "Email", ref: "input", bsStyle: this.validationState(), onChange: this.onEmailChange.bind(this), readOnly: this.state.saving || this.state.sent, value: this.state.email, hasFeedback: true, placeholder: "So I can get back to you!"}))), React.createElement("div", {className: "section", hidden: this.state.sent}, React.createElement(react_bootstrap_1.Alert, {bsStyle: "danger", hidden: this.state.error == null}, React.createElement("strong", null, "Whoops!"), " ", this.state.error), React.createElement(react_bootstrap_1.Button, {disabled: this.isSendButtonDisabled(), bsStyle: "primary", onClick: this.reportError.bind(this)}, this.state.saving ? "Sending logs, this may take a minute (" + this.state.filesize + ")..." : "Submit")), React.createElement("div", {className: "section", hidden: !this.state.sent}, "Sent! Thanks for your help :)"));
    }
}
exports.ErrorReportView = ErrorReportView;
