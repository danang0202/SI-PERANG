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
import ResponsiveNavLink from '../ResponsiveNavLink';

const menuItemsAdmin = [
    {
        key: "admin-dashboard",
        label: "Dashboard",
        icon: <IconLayoutBoard size={20} />,
        route: "/admin/dashboard",
        children: [],
    },
    {
        key: "pengajuan",
        label: "Pengajuan",
        icon: <IconClipboardData size={20} />,
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
        icon: <IconBrandAirtable size={20} />,
        route: '/admin/inventaris-barang',
        children: [],
    },
    {
        key: "admin-user-management",
        label: "User",
        icon: <IconUsers size={19} />,
        route: '/admin/user-management',
        children: [],
    },
];

const menuItemsUser = [
    {
        key: "dashboard",
        label: "Dashboard",
        icon: <IconLayoutBoard size={20} />,
        route: "/dashboard",
        children: [],
    },
    {
        key: "pengajuan",
        label: "Pengajuan",
        icon: <IconClipboardData size={20} />,
        children: [
            {
                key: "pengajuan-tambah-pengajuan",
                label: "Tambah Pengajuan",
                route: "/pengajuan/tambah-pengajuan",
                children: []
            },
            {
                key: "pengajuan-riwayat-pengajuan",
                label: "Riwayat Pengajuan",
                route: "/pengajuan/riwayat-pengajuan",
                children: []
            },
        ],
    },
    {
        key: "daftar-barang",
        label: "Daftar Barang",
        icon: <IconBrandAirtable size={20} />,
        route: '/daftar-barang',
        children: [],
    },
];
export const NavbarMenu = ({ isAdmin }) => {
    const { selectedKey, setSelectedKey } = useMenuContext();
    useEffect(() => {
        setSelectedKey(findSelectedKey(isAdmin ? menuItemsAdmin : menuItemsUser, window.location.pathname));
    }, []);

    return (
        <Stack gap={4} mt={"lg"} mih="85vh" justify="space-between">
            <Stack gap={3}>
                {isAdmin ?
                    menuItemsAdmin.map((menuItem, i) => (
                        <NavbarButton
                            menuItem={menuItem}
                            key={i}
                            selectedKey={selectedKey}
                            setSelectedKey={setSelectedKey}
                        />
                    )) :
                    menuItemsUser.map((menuItem, i) => (
                        <NavbarButton
                            menuItem={menuItem}
                            key={i}
                            selectedKey={selectedKey}
                            setSelectedKey={setSelectedKey}
                        />
                    ))
                }
            </Stack>
            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                Log Out
            </ResponsiveNavLink>
        </Stack>
    );
};

export default NavbarMenu