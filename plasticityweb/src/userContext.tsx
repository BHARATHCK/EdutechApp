import React from "react";

const userContext = React.createContext({ authenticated: false, user: {} });

export { userContext };
