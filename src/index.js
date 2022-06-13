import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    HttpLink,
} from "@apollo/client";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: "https://backend-api-d.herokuapp.com/graphql",
    }),
});

ReactDOM.render( <
    ApolloProvider client = { client } >
    <
    BrowserRouter >
    <
    App / >
    <
    /BrowserRouter> < /
    ApolloProvider > ,
    document.getElementById("root")
);