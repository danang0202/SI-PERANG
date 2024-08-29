export const findSelectedKey = (menuItems, path) => {
    for (let menuItem of menuItems) {
        if (path.startsWith(menuItem.route)) {
            return menuItem.key;
        }
        if (menuItem.children && menuItem.children.length > 0) {
            const selectedChildKey = findSelectedKey(menuItem.children, path);
            if (selectedChildKey) {
                return selectedChildKey;
            }
        }
    }
    return null;
};


export const buildQueryString = (params) => {
    return Object.keys(params)
        .map(key => {
            const value = params[key];
            if (Array.isArray(value)) {
                // Encode array values with [] to %5B%5D
                return value.map(val => `${encodeURIComponent(key)}%5B%5D=${encodeURIComponent(val)}`).join('&');
            } else {
                return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
            }
        })
        .join('&');
};

