import { useMenuContext } from "@/Provider/Menu";
import { Link } from "@inertiajs/react";
import {
    ActionIcon,
    Collapse,
    Group,
    Text,
    UnstyledButton,
    lighten,
    useMantineTheme,
} from "@mantine/core";
import { useDisclosure, useHover } from "@mantine/hooks";
import { IconChevronRight } from "@tabler/icons-react";
import React, { FC, useEffect, useState } from "react";
const NavbarButton = ({ menuItem, selectedKey }) => {
    const theme = useMantineTheme();
    const [isSelectedMenu, setIsSelectedMenu] = useState(false);
    const [isSubmenuActive, setIsSubMenuActive] = useState(false);
    const { setSelectedKey } = useMenuContext();
    const { hovered, ref } = useHover();
    const hasSubmenu = menuItem.children.length > 0;
    const [isSubmenuOpen, { toggle: toggleSubMenu }] = useDisclosure(hasSubmenu);
    useEffect(() => {
        if (selectedKey) {
            setIsSelectedMenu(menuItem.key === selectedKey || !hasSubmenu && selectedKey.includes(menuItem.key))
            setIsSubMenuActive(hasSubmenu && selectedKey.includes(menuItem.key))
        }
    }, [selectedKey])

    const backgroundColor = hovered ? theme.colors.gray[0] : "";
    const ButtonFill = (
        <Group justify="space-between" align="center" ref={ref} p="sm" w="100%">
            <Group gap="xs" align="center">
                {menuItem.icon && (
                    <ActionIcon
                        variant={isSelectedMenu || isSubmenuActive ? 'filled' : 'light'}
                        bg={isSelectedMenu || isSubmenuActive ? 'bluePrimary' : 'blueBackground'}
                        aria-label="Settings"
                        size={"lg"}
                    >
                        {menuItem.icon}
                    </ActionIcon>
                )}

                <Text
                    fw={isSelectedMenu || isSubmenuActive ? 'bold' : 'normal'}
                    size="sm"
                    pl={menuItem.icon ? 0 : "35px"}
                >
                    {menuItem.label}
                </Text>
            </Group>

            {hasSubmenu && (
                <IconChevronRight
                    size={18}
                    style={{
                        transition: "200ms",
                        transform: isSubmenuOpen ? `rotate(90deg)` : "none",
                    }}
                />
            )}
        </Group>
    );

    return (
        <React.Fragment>
            {hasSubmenu ? (
                <Group
                    bg={backgroundColor}
                    style={{ borderRadius: "5px", cursor: "pointer" }}
                    onClick={() => toggleSubMenu()}
                    w="100%"
                >
                    {ButtonFill}
                </Group>
            ) : (
                <UnstyledButton
                    bg={backgroundColor}
                    style={{ borderRadius: "5px" }}
                    w="100%"
                    variant="light"
                >
                    <Link href={route(menuItem.route)} onClick={() => setSelectedKey(menuItem.key)}>
                        {ButtonFill}
                    </Link>
                </UnstyledButton>
            )}

            {hasSubmenu && (
                <Collapse
                    in={isSubmenuOpen}
                    transitionDuration={200}
                    transitionTimingFunction="linear"
                >
                    {menuItem.children.map((submenu, i) => (
                        <NavbarSubMenu menuItem={submenu} selectedKey={selectedKey} key={i} />
                    ))}
                </Collapse>
            )}
        </React.Fragment>
    );
};

export default NavbarButton;


const NavbarSubMenu = ({ menuItem, selectedKey }) => {
    const theme = useMantineTheme();
    const { setSelectedKey } = useMenuContext();
    const { hovered, ref } = useHover();
    const [isSelectedMenu, setIsSelectedMenu] = useState(false);

    useEffect(() => {
        if (selectedKey) {
            setIsSelectedMenu(menuItem.key === selectedKey)
        }
    }, [selectedKey])

    const backgroundColor = hovered ? theme.colors.gray[0] : "";



    const ButtonFill = (
        <Group justify="space-between" align="start" ref={ref} p="sm" w="100%" className={`${isSelectedMenu ? 'border-bluePrimary border-l-2' : 'border-l border-gray-400'}`}>
            <Group gap="xs" align="center">
                <Text
                    fw={isSelectedMenu ? 'bold' : 'normal'}
                    size="sm"
                >
                    {menuItem.label}
                </Text>
            </Group>
        </Group>
    );
    return (
        <React.Fragment>
            <UnstyledButton
                bg={backgroundColor}
                style={{ borderEndEndRadius: "5px", borderTopRightRadius: '5px' }}
                w="85%"
                ml={'xl'}
            >
                <Link href={route(menuItem.route)} onClick={() => setSelectedKey(menuItem.key)}>
                    {ButtonFill}
                </Link>
            </UnstyledButton>
        </React.Fragment>
    )
}