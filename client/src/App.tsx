import React from "react";
import { Routing } from "./routing";

interface Props {}

export const App: React.FC<Props> = (props: Props) => {
    return (
        <div className="pt-md-4">
            <Routing />
        </div>
    );
};

export default App;
