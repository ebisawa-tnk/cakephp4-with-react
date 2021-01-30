import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Layout from "./pages/layout"
import Top from "./pages/top"
import Settings from "./pages/settings"

// TODO https://qiita.com/TsutomuNakamura/items/34a7339a05bb5fd697f2
const app = document.getElementById('app');
ReactDOM.render(
    <Router>
        <Layout>
            <Route exact path="/" component={Top}></Route>
            <Route path="/settings" component={Settings}></Route>
        </Layout>
    </Router>,
    app);
