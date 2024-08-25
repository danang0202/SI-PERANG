import { EXTENDED_COLOR } from '@/constan/mantine.constan';
import { Group, Menu, Text, UnstyledButton } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { IconFilterFilled } from '@tabler/icons-react';
import React, { useState } from 'react'

function FilterButton() {
    const [opened, setOpened] = useState(false);
    const { ref, hovered } = useHover();
    return (
        <Menu shadow="md" width={342} position="bottom-start" opened={opened}>
            <Menu.Target>
                <UnstyledButton
                    onClick={() => {
                        setOpened(!opened);
                        form.reset();
                    }}
                >
                    <Group gap={6} ref={ref} opacity={hovered ? .6 : 1} className='transition duration-300'>
                        <IconFilterFilled color={EXTENDED_COLOR.bluePrimary} />
                        <Text c="bluePrimary" fw={'bold'}>Filter</Text>
                    </Group>
                </UnstyledButton>
            </Menu.Target>
        </Menu>
    )
}

export default FilterButton