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
        route: "admin.dashboard",
        href: '/admin/dashboard',
        children: [],
    },
    {
        key: "pengajuan",
        label: "Permintaan",
        icon: <IconClipboardData size={20} />,
        children: [
            {
                key: "admin-pengajuan-perlu-tindakan",
                label: "Perlu Tindakan",
                route: "admin.pengajuan.perlu-tindakan",
                href: '/admin/pengajuan/perlu-tindakan',
                children: []
            },
            {
                key: "admin-pengajuan-riwayat-pengajuan",
                label: "Riwayat Permintaan",
                route: "admin.pengajuan.riwayat-pengajuan",
                href: '/admin/pengajuan/riwayat-pengajuan',
                children: []
            },
        ],
    },
    {
        key: "admin-inventaris-barang",
        label: "Inventaris Barang",
        icon: <IconBrandAirtable size={20} />,
        route: 'admin.inventaris-barang',
        href: '/admin/inventaris-barang',
        children: [],
    },
    {
        key: "admin-user-management",
        label: "User",
        icon: <IconUsers size={19} />,
        route: 'admin.user-management',
        href: '/admin/user-management',
        children: [],
    },
];

const menuItemsUser = [
    {
        key: "dashboard",
        label: "Dashboard",
        icon: <IconLayoutBoard size={20} />,
        route: "user.dashboard",
        href: '/dashboard',
        children: [],
    },
    {
        key: "pengajuan",
        label: "Permintaan",
        icon: <IconClipboardData size={20} />,
        children: [
            {
                key: "pengajuan-tambah-pengajuan",
                label: "Tambah Permintaan",
                route: "user.pengajuan.tambah",
                href: '/pengajuan/tambah-pengajuan',
                children: []
            },
            {
                key: "pengajuan-riwayat-pengajuan",
                label: "Riwayat Permintaan",
                route: "user.pengajuan.riwayat",
                href: '/pengajuan/riwayat-pengajuan',

                children: []
            },
        ],
    },
    {
        key: "daftar-barang",
        label: "Daftar Barang",
        icon: <IconBrandAirtable size={20} />,
        route: 'user.daftar-barang',
        href: '/daftar-barang',
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
        </Stack>
    );
};

export default NavbarMenu