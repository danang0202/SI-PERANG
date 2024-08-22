import React, { useEffect, useState } from 'react'
import {
    IconBrandAirtable,
    IconClipboardData,
    IconLayoutBoard,
    IconUsers,
} from "@tabler/icons-react";
import { Stack } from '@mantine/core';
import NavbarButton from './NavbarButton';
import { findSelectedKey } from '@/helper/route.helper';
import { useMenuContext } from '@/Provider/Menu';

const menuItems = [
    {
        key: "admin-dashboard",
        label: "Dashboard",
        icon: <IconLayoutBoard  size={18}/>,
        route: "/admin/dashboard",
        children: [],
    },
    {
        key: "pengajuan",
        label: "Pengajuan",
        icon: <IconClipboardData  size={19}/>,
        children: [
            {
                key: "admin-pengajuan-perlu-tindakan",
                label: "Perlu Tindakan",
                route: "/admin/pengajuan/perlu-tindakan",
                children: []
            },
            {
                key: "admin-pengajuan-riwayat-pengajuan",
                label: "Riwayat Pengajuan",
                route: "/admin/pengajuan/riwayat-pengajuan",
                children: []
            },
        ],
    },
    {
        key: "admin-inventaris-barang",
        label: "Inventaris Barang",
        icon: <IconBrandAirtable size={18}  />,
        route: '/admin/inventaris-barang',
        children: [],
    },
    {
        key: "admin-user-management",
        label: "User",
        icon: <IconUsers size={17} />,
        route: '/admin/user-management',
        children: [],
    },
];
export const NavbarMenu = () => {
    const { selectedKey, setSelectedKey } = useMenuContext();
    useEffect(() => {
        setSelectedKey(findSelectedKey(menuItems, window.location.pathname));
    }, []);

    return (
        <Stack gap={4} mt={"lg"} mih="85vh" justify="space-between">
            <Stack gap={3}>
                {menuItems.map((menuItem, i) => (
                    <NavbarButton
                        menuItem={menuItem}
                        key={i}
                        selectedKey={selectedKey}
                        setSelectedKey={setSelectedKey}
                    />
                ))}
            </Stack>
            <p>Logout</p>
        </Stack>
    );
};

export default NavbarMenu