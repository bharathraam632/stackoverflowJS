import "./index.css";
import {useState} from "react";
import {useAuthContext} from "../../hooks/useAuthContext";
import {useLogout} from "../../hooks/useLogout";

const Header = ({search, setQuesitonPage}) => {
    const [val, setVal] = useState(search);
    const {user} = useAuthContext()
    const {logout} = useLogout()

    const handleLogout = () => {
        logout()
        setQuesitonPage("", "All Questions")
    }
    return (
        <div id="header" className="header">
            <div></div>
            <div className="title">Fake Stack Overflow</div>
            <input
                id="searchBar"
                placeholder="Search ..."
                type="text"
                value={val}
                onChange={(e) => {
                    setVal(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        setQuesitonPage(e.target.value, "Search Results");
                    }
                }}
            />
            {user && <button id={"logoutBtn"} onClick={handleLogout}>Logout</button>}
        </div>
    );
};

export default Header;
