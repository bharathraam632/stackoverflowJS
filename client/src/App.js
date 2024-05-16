// ************** THIS IS YOUR APP'S ENTRY POINT. CHANGE THIS FILE AS NEEDED. **************
// ************** DEFINE YOUR REACT COMPONENTS in ./components directory **************
import React from "react";
import "./stylesheets/App.css";
import FakeStackOverflow from "./components/fakestackoverflow.js";
import {AuthContextProvider} from "./context/AuthContext";

function App() {
    return (
        <AuthContextProvider>
            <FakeStackOverflow/>
        </AuthContextProvider>
    );
}

export default App;
