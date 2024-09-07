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
import AvatarImage from '@/Components/Commons/AvatarImage';
import { EXTENDED_COLOR } from '@/constan/mantine.constan';
import AvatarPopOver from '@/Components/Commons/AvatarPopOver';

const UserLayout = ({ children, session, title }) => {
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

    if (!session) {
        return (
            <>
                {children}
            </>
        )
    }

    return (
        <AppShell
            layout="alt"
            header={{ height: 70 }}
            navbar={{
                width: 270,
                breakpoint: "md",
                collapsed: { mobile: !isNavbarOpen, desktop: !isNavbarOpen },
            }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Group justify="space-between" w="100%" pr={{ base: "0", lg: 'lg' }}>
                        <Group>
                            {isMobile && !isNavbarOpen && HamburgerMenu}
                            {!isMobile && !isNavbarOpen && HamburgerMenu}
                            <Text
                                fw={"bold"}
                                fz={24}
                                variant="gradient"
                                gradient={{ from: 'blue', to: 'cyan', deg: 65 }}
                            >
                                {title || 'Dashboard'}
                            </Text>
                        </Group>
                        <Group>
                            <Popover
                                width={250}
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
                                    <Stack align='center' gap={0}>
                                        <Text fw={'bold'} c={'gray1'} size='sm'>Maaf</Text>
                                        <Text size='sm' c={'gray1'}>Fitur ini belum tersedia</Text>
                                    </Stack>
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
                                        <AvatarImage
                                            src={""}
                                            name={session.nama}
                                            alt="It's me"
                                            backgroundColorIfRandom={EXTENDED_COLOR.bluePrimary}
                                            colorIfRandom={EXTENDED_COLOR.white}
                                        />
                                    </UnstyledButton>
                                </Popover.Target>
                                <Popover.Dropdown>
                                    <AvatarPopOver session={session} />
                                </Popover.Dropdown>
                            </Popover>
                        </Group>
                    </Group>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
                <Stack>
                    <Group justify="space-between" pt={10}>
                        <Group pl={10}>
                            <img src="/images/logo-small.png" alt="Logo" width={160} />
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
                    <NavbarMenu isAdmin={session.role === 'ADMIN'} />
                </Stack>
            </AppShell.Navbar>
            <AppShell.Main mr={{ base: 0, lg: 'lg' }}>{children}</AppShell.Main>
        </AppShell>
    )
}

export default UserLayout