import TextStatus from '@/Components/Commons/TextStatus';
import { EXTENDED_COLOR } from '@/constan/mantine.constan';
import { statusesData } from '@/helper/common.helper';
import { Badge, Box, Button, Checkbox, Divider, Grid, Group, Menu, Stack, Text, UnstyledButton } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useHover } from '@mantine/hooks';
import { IconArrowRight, IconCalendar, IconFilter, IconFilterFilled } from '@tabler/icons-react';
import React, { useState, useEffect } from 'react';
const FilterButtonRiwayatPengajuan = ({ localDateRange, setLocalDateRange, localSelectedStatus, setLocalSelectedStatus, localSelectedTimKerja, setLocalSelectedTimKerja, setPage, handleRouteVisit, timKerja }) => {
    const [opened, setOpened] = useState(false);
    const { ref, hovered } = useHover();


    const handleSelectAllStatuses = () => {
        setLocalSelectedStatus(statusesData);
    };

    const handleDeselectAllStatuses = () => {
        setLocalSelectedStatus([]);
    };

    const handleCheckboxChange = (statusLabel) => {
        if (localSelectedStatus.includes(statusLabel)) {
            setLocalSelectedStatus(
                localSelectedStatus.filter((s) => s !== statusLabel)
            );
        } else {
            setLocalSelectedStatus([    
                ...localSelectedStatus,
                statusLabel,
            ]);
        }
    };

    const handleTimKerjaCheckBoxChange = (itemLabel) => {
        if (localSelectedTimKerja.includes(itemLabel)) {
            setLocalSelectedTimKerja(
                localSelectedTimKerja.filter((s) => s !== itemLabel)
            );
        } else {
            setLocalSelectedTimKerja([
                ...localSelectedTimKerja,
                itemLabel,
            ]);
        }
    };
    return (
        <Menu shadow="md" position="bottom-start" opened={opened}>
            <Menu.Target>
                <UnstyledButton
                    onClick={() => {
                        setOpened(!opened);
                    }}
                >
                    <Group gap={6} ref={ref} opacity={hovered ? .6 : 1} className='transition duration-300'>
                        {localSelectedStatus.length < 4 || localSelectedTimKerja.length < 8 || (localDateRange[0] && localDateRange[1]) ? (
                            <IconFilterFilled color={EXTENDED_COLOR.bluePrimary} />
                        ) : (
                            <IconFilter color={EXTENDED_COLOR.bluePrimary} />
                        )}
                        <Text c="bluePrimary" fw={'bold'}>Filter</Text>
                    </Group>
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown py="md" w={550}>
                <Stack gap={8}>
                    <Stack px={"md"}>
                        <Text size='sm'>Rentang Tanggal</Text>
                        <Grid gutter={0} w={300}>
                            <Grid.Col span={6}>
                                <DatePickerInput
                                    size='xs'
                                    maxDate={localDateRange[1] ?? undefined}
                                    placeholder="Pilih tanggal"
                                    styles={{
                                        input: {
                                            borderRight: 0,
                                            borderRadius: 0,
                                            borderTopLeftRadius: "3px",
                                            borderBottomLeftRadius: "3px",
                                        },
                                    }}
                                    value={localDateRange[0]}
                                    onChange={(value) => setLocalDateRange([value, localDateRange[1]])}
                                    rightSection={
                                        <IconArrowRight
                                            size={14}
                                            color={EXTENDED_COLOR.bluePrimary}
                                        />
                                    }
                                />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <DatePickerInput
                                    size='xs'
                                    minDate={localDateRange[0] ?? undefined}
                                    value={localDateRange[1]}
                                    onChange={(value) => setLocalDateRange([localDateRange[0], value])}
                                    placeholder="Pilih tanggal"
                                    rightSection={
                                        <IconCalendar size={20} color={EXTENDED_COLOR.bluePrimary} />
                                    }
                                    styles={{
                                        input: {
                                            borderLeft: 0,
                                            borderRadius: 0,
                                            borderTopRightRadius: "3px",
                                            borderBottomRightRadius: "3px",
                                        },
                                    }}
                                />
                            </Grid.Col>
                        </Grid>
                    </Stack>
                    <Divider my="md" size="sm" mx={-4} />
                    <Stack px={"md"}>
                        <Grid>
                            <Grid.Col span={6}>
                                <Stack gap={"xs"}>
                                    <Text size="sm">Status pengajuan</Text>
                                    <Group>
                                        <Text
                                            size="xs"
                                            c="bluePrimary"
                                            style={{ cursor: "pointer" }}
                                            onClick={handleSelectAllStatuses}
                                        >
                                            Select All
                                        </Text>
                                        <Text
                                            size="xs"
                                            c="gray1"
                                            style={{ cursor: "pointer" }}
                                            onClick={handleDeselectAllStatuses}
                                        >
                                            Deselect All
                                        </Text>
                                    </Group>
                                    <Stack gap={"xs"}>
                                        {statusesData.map((status) => {
                                            const isChecked = localSelectedStatus && localSelectedStatus.includes(status);
                                            return (
                                                <Checkbox
                                                    checked={isChecked}
                                                    color="bluePrimary"
                                                    size="xs"
                                                    key={status}
                                                    onChange={() => { handleCheckboxChange(status) }}
                                                    label={<TextStatus status={status} />}
                                                    radius={"xs"}
                                                />
                                            );
                                        })}
                                    </Stack>
                                </Stack>
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Stack gap={"xs"}>
                                    <Text size="sm">Tim Kerja</Text>
                                    <Group>
                                        <Text
                                            size="xs"
                                            c="bluePrimary"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => setLocalSelectedTimKerja(timKerja)}
                                        >
                                            Select All
                                        </Text>
                                        <Text
                                            size="xs"
                                            c="gray1"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => setLocalSelectedTimKerja([])}
                                        >
                                            Deselect All
                                        </Text>
                                    </Group>
                                    <Grid gutter="xs">
                                        {timKerja.map((item, index) => {
                                            const isChecked = localSelectedTimKerja && localSelectedTimKerja.includes(item);
                                            return (
                                                <Grid.Col span={6} key={index}>
                                                    <Checkbox
                                                        checked={isChecked}
                                                        color="bluePrimary"
                                                        size="xs"
                                                        onChange={() => handleTimKerjaCheckBoxChange(item)}
                                                        label={<Badge color='secondaryPurple' variant='light' radius={"xs"}>{item}</Badge>}
                                                        radius={"xs"}
                                                    />
                                                </Grid.Col>
                                            );
                                        })}
                                    </Grid>
                                </Stack>
                            </Grid.Col>
                        </Grid>
                    </Stack>
                    <Divider my="md" size="sm" mx={-4} />
                    <Group gap={"md"} justify='center'>
                        <Button variant='outline' color='gray' radius={'xs'} size='xs' onClick={() => { setOpened(false) }}>
                            Tutup
                        </Button>
                        <Button className='hover:opacity-60 transition' size='xs' radius={'xs'} onClick={() => { setOpened(false); setPage(1); handleRouteVisit() }}>
                            Terapkan
                        </Button>
                    </Group>
                </Stack>
            </Menu.Dropdown>
        </Menu >
    )
}

export default FilterButtonRiwayatPengajuan