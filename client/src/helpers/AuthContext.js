import React from 'react';

let Context = React.createContext();

export const AuthProvider = Context.Provider;
export const AuthConsumer = Context.Consumer;

export default Context
