import React, { useEffect, useState } from 'react'
import {
    IconBrandAirtable,
    IconClipboardData,
    IconLayoutBoard,
    IconPower,
    IconUsers,
} from "@tabler/icons-react";
import { ActionIcon, Group, Stack, Text, useMantineTheme } from '@mantine/core';
import NavbarButton from './NavbarButton';
import { findSelectedKey } from '@/helper/route.helper';
import { useMenuContext } from '@/Provider/Menu';
import { useHover } from '@mantine/hooks';
import { Link } from '@inertiajs/react';

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
export const NavbarMenu = ({ isAdmin, toggle}) => {
    const theme = useMantineTheme();
    const { hovered, ref } = useHover();
    const { selectedKey, setSelectedKey } = useMenuContext();
    useEffect(() => {
        setSelectedKey(findSelectedKey(isAdmin ? menuItemsAdmin : menuItemsUser, window.location.pathname));
    }, []);
    const backgroundColor = hovered ? theme.colors.gray[0] : "";

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
                            toggle={toggle}
                        />
                    )) :
                    menuItemsUser.map((menuItem, i) => (
                        <NavbarButton
                            menuItem={menuItem}
                            key={i}
                            selectedKey={selectedKey}
                            setSelectedKey={setSelectedKey}
                            toggle={toggle}
                        />
                    ))
                }
                <Link href={route('logout')} method="post">
                    <Group
                        bg={backgroundColor}
                        style={{ borderRadius: "5px", cursor: "pointer" }}
                        onClick={() => toggleSubMenu()}
                        w="100%"
                        py={"xs"}
                        mt={"lg"}
                    >
                        <Group gap="xs" align="center" ml={"xs"} ref={ref}>
                            <ActionIcon
                                variant={'light'}
                                color='accent6'
                                aria-label="LOgout"
                                size={"lg"}
                            >
                                <IconPower />
                            </ActionIcon>

                            <Text
                                size="sm"
                                pl={0}
                                c={'accent6'}
                            >
                                Logout
                            </Text>
                        </Group>
                    </Group>
                </Link>
            </Stack>
        </Stack>
    );
};

export default NavbarMenu