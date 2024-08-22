import { createContext, useContext, useState } from 'react';

const MenuContext = createContext(null);

export const MenuProvider = ({ children }) => {
    const [selectedKey, setSelectedKey] = useState(null);

    return (
        <MenuContext.Provider value={{ selectedKey, setSelectedKey }}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenuContext = () => {
    return useContext(MenuContext);
};
