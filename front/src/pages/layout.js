import React from "react";
import { Link } from "react-router-dom";

export default class Layout extends React.Component {
    render() {
        return (
            <div>
                <h1>Welcome!</h1>
                {this.props.children}
                <Link to="/settings">settings</Link>,
                <Link to="/">top</Link>
            </div>
        );
    }
}
