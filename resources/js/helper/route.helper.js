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
