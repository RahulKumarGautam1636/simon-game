import { useState } from "react";
import Theme1 from "./themes/theme1";
import Theme2 from "./themes/theme2";

const Theme = () => {

    const [theme, setTheme] = useState('theme1');

    return (
        <div>
            <i className="bx bx-search header-login ms-3" onClick={() => setTheme('theme2')}></i>
            {/* {theme === 'theme2' && <Theme2/>} */}
            {theme === 'theme1' && <Theme1/>}
            {/* {theme === 'theme3' && <Theme3/>} */}
        </div>
    )
}

export default Theme;