import React from 'react';

export default React.createContext({
    users: [],
    habits: [],
    targetUser: [],
    setUser: () => {},
    addUser: () => {},
    addHabit: () => {},
    deleteHabit: () => {},
    habitComplete: () => {}
})