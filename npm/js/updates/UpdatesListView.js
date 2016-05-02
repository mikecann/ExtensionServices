"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const React = require("react");
const UpdateHelpers_1 = require("./UpdateHelpers");
const marked = require("marked");
class UpdatesListView extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            updates: [],
        };
        this.loadUpdates(props.manifestUrl);
    }
    componentWillReceiveProps(newProps) {
        this.loadUpdates(newProps.manifestUrl);
    }
    loadUpdates(manifest) {
        return __awaiter(this, void 0, void 0, function* () {
            var updates = yield UpdateHelpers_1.UpdateHelpers.load(this.props.manifestUrl);
            //logger.debug(this, "Updates loaded from disk", updates);        
            this.setState({ updates: updates });
        });
    }
    rawMarkup(update) {
        var rawMarkup = marked(update.notes, { sanitize: true });
        return { __html: rawMarkup };
    }
    renderUpdate(u, count) {
        return React.createElement("div", {key: count}, React.createElement("h2", {className: "update-title"}, "New in ", u.version, " (", u.date, ") "), React.createElement("p", {dangerouslySetInnerHTML: this.rawMarkup(u)}));
    }
    render() {
        var count = 0;
        return React.createElement("div", null, this.state.updates.map(u => this.renderUpdate(u, count++)));
    }
}
exports.UpdatesListView = UpdatesListView;
