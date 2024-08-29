import { createContext, useContext, useState } from 'react';

const MenuContext = createContext(null);

export const MenuProvider = ({ children }) => {
    const [selectedKey, setSelectedKey] = useState(null);
    const [loading, setLoading] = useState(false);
    return (
        <MenuContext.Provider value={{ selectedKey, setSelectedKey, loading, setLoading }}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenuContext = () => {
    return useContext(MenuContext);
};
