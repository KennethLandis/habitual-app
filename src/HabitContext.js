import React from 'react';

export default React.createContext({
    clients: [],
    habits: [],
    targetClient: [],
    setClient: () => {},
    addClient: () => {},
    addHabit: () => {},
    deleteHabit: () => {},
    habitComplete: () => {},
    signOut: () => {}
})