import TextStatus from '@/Components/Commons/TextStatus';
import { EXTENDED_COLOR } from '@/constan/mantine.constan';
import { statusesData } from '@/helper/common.helper';
import { Box, Button, Checkbox, Divider, Grid, Group, Menu, Stack, Text, UnstyledButton } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useHover } from '@mantine/hooks';
import { IconArrowRight, IconCalendar, IconFilter, IconFilterFilled } from '@tabler/icons-react';
import React, { useState, useEffect } from 'react';

const FilterButtonUserRiwayatPengajuan = ({ dateRange, setDateRange, selectedStatus, setSelectedStatus }) => {
    const [opened, setOpened] = useState(false);
    const { ref, hovered } = useHover();
    const [localDateRange, setLocalDateRange] = useState([null, null]);
    const [localSelectedStatus, setLocalSelectedStatus] = useState(statusesData);

    useEffect(() => {
        setLocalDateRange(dateRange);
        setLocalSelectedStatus(selectedStatus)
    }, [dateRange, selectedStatus])


    const handleApplyFilters = () => {
        setDateRange(localDateRange);
        setSelectedStatus(localSelectedStatus);
        setOpened(false);
    };

    const handleBatalFilters = () => {
        setLocalDateRange(dateRange);
        setLocalSelectedStatus(selectedStatus);
    }

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


    return (
        <Menu shadow="md" width={342} position="bottom-start" opened={opened}>
            <Menu.Target>
                <UnstyledButton
                    onClick={() => {
                        setOpened(!opened);
                    }}
                >
                    <Group gap={6} ref={ref} opacity={hovered ? .6 : 1} className='transition duration-300'>
                        {selectedStatus.length < 4 || (dateRange[0] && dateRange[1]) ? (
                            <IconFilterFilled color={EXTENDED_COLOR.bluePrimary} />
                        ) : (
                            <IconFilter color={EXTENDED_COLOR.bluePrimary} />
                        )}
                        <Text c="bluePrimary" fw={'bold'}>Filter</Text>
                    </Group>
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown py="md" w={300}>
                <Stack gap={8}>
                    <Stack px={"md"}>
                        <Text size='sm'>Rentang Tanggal</Text>
                        <Grid gutter={0} w={260}>
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
                    <Divider my="md" size="sm" mx={-4} />
                    <Group gap={"md"} justify='center'>
                        <Button variant='outline' color='gray' radius={'xs'} size='xs' onClick={() => { handleBatalFilters(); setOpened(false) }}>
                            Batal
                        </Button>
                        <Button size='xs' radius={'xs'} onClick={handleApplyFilters}>
                            Terapkan
                        </Button>
                    </Group>
                </Stack>
            </Menu.Dropdown>
        </Menu >
    );
}

export default FilterButtonUserRiwayatPengajuan;
