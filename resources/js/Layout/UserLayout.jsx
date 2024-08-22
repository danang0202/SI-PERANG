import React, { useEffect, useMemo } from 'react'
import {
    ActionIcon,
    AppShell,
    Group,
    Popover,
    Stack,
    Text,
    Title,
    UnstyledButton,
    useMantineTheme,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { IconBell, IconMenu2, IconX } from '@tabler/icons-react';
import NavbarMenu from '@/Components/Commons/NavbarMenu';

const UserLayout = ({ children }) => {
    const theme = useMantineTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
    const [isNavbarOpen, { toggle }] = useDisclosure(true);
    const HamburgerMenu = useMemo(
        () => (
            <ActionIcon
                variant="transparent"
                aria-label="Settings"
                onClick={toggle}
                color="black"
            >
                <IconMenu2 stroke={1.5} size={30} />
            </ActionIcon>
        ),
        [toggle],
    );

    useEffect(() => {
        if (isMobile) {
            toggle();
        }
    }, [isMobile]);

    return (
        <AppShell
            layout="alt"
            header={{ height: 70 }}
            navbar={{
                width: 300,
                breakpoint: "md",
                collapsed: { mobile: !isNavbarOpen, desktop: !isNavbarOpen },
            }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Group justify="space-between" w="100%">
                        <Group>
                            {isMobile && !isNavbarOpen && HamburgerMenu}
                            {!isMobile && !isNavbarOpen && HamburgerMenu}
                            <Title fz={24}>{'Dashboard'}</Title>
                        </Group>

                        <Group>
                            <Popover
                                width={300}
                                position="bottom-end"
                                withArrow
                                shadow="md"
                            >
                                <Popover.Target>
                                    <UnstyledButton>
                                        <IconBell stroke={1.5} />
                                    </UnstyledButton>
                                </Popover.Target>
                                <Popover.Dropdown>
                                    {/* <NotificationPopOver /> */}
                                </Popover.Dropdown>
                            </Popover>
                            <Popover
                                width={350}
                                position="bottom-end"
                                withArrow
                                shadow="md"
                            >
                                <Popover.Target>
                                    <UnstyledButton>
                                        {/* <AvatarImage
                                            src={session.user.image}
                                            name={session.user.name || ""}
                                            alt="It's me"
                                            backgroundColorIfRandom={EXTENDED_COLOR.bluePrimary}
                                            colorIfRandom={EXTENDED_COLOR.white}
                                        /> */}
                                    </UnstyledButton>
                                </Popover.Target>
                                <Popover.Dropdown>
                                    {/* <AvatarPopOver session={session} /> */}
                                </Popover.Dropdown>
                            </Popover>
                        </Group>
                    </Group>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
                <Stack>
                    <Group justify="space-between" pt={10}>
                        <Group pl={20}>
                            {/* <Logo h={40} /> */}
                            <Text fw={'bold'}>SI PERANG</Text>
                        </Group>
                        {!isMobile && isNavbarOpen && HamburgerMenu}
                        {isMobile && isNavbarOpen && (
                            <ActionIcon
                                variant="transparent"
                                aria-label="Settings"
                                onClick={toggle}
                                color="black"
                            >
                                <IconX stroke={1.5} size={30} />
                            </ActionIcon>
                        )}
                    </Group>
                    <NavbarMenu />
                </Stack>
            </AppShell.Navbar>
            <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
    )
}

export default UserLayout