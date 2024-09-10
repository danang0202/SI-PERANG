import ButtonOutlineWithRoute from '@/Components/Commons/ButtonOutlineWithRoute'
import { showFailNotification, showSuccesNotification } from '@/helper/notification.helper'
import AdminUserManagementLayout from '@/Layout/AdminUserManagementLayout'
import UserLayout from '@/Layout/Layout'
import { timKerjaSchema } from '@/Schema/user-management.schema'
import { router, usePage } from '@inertiajs/react'
import { Button, Grid, Group, Select, Stack, Text, TextInput, useMantineTheme } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { useMediaQuery } from '@mantine/hooks'
import React, { useEffect, useState } from 'react'

const UpdateTImKerja = ({ user, users, status, prevTimKerja }) => {
    const theme = useMantineTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
    const { errors } = usePage().props
    const [loading, setLoading] = useState(false);
    const [selectedKetua, setSelectedKetua] = useState(null);

    useEffect(() => {
        if (status && status.type == 'success') {
            showSuccesNotification(status.message)
        } else if (status && status.type == 'fail') {
            showFailNotification(status.message)
        }
    }, [status])


    const form = useForm({
        mode: 'controlled',
        initialValues: {
            nama: prevTimKerja.nama,
            namaKetua: prevTimKerja.nama_ketua,
            nipKetua: prevTimKerja.nip_ketua,
        },
        validate: zodResolver(timKerjaSchema)
    });

    useEffect(() => {
        if (selectedKetua) {
            const ketua = users.find((user) => user.id.toString() === selectedKetua.value)
            if (ketua) {
                form.setFieldValue('namaKetua', ketua.nama);
                form.setFieldValue('nipKetua', ketua.nip);
            }
        }
    }, [selectedKetua])


    useEffect(() => {
        if (errors) {
            const formattedErrors = {};
            Object.keys(errors).forEach((key) => {
                formattedErrors[key] = errors[key];
            });
            form.setErrors(formattedErrors);
            setLoading(false);
        }
    }, [errors]);

    const handleSubmit = (values) => {
        setLoading(true)
        router.post(route('admin.user-management.tim-kerja.update.action', { id: prevTimKerja.id }), values, {
        });
    };


    return (
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <Stack gap={'xs'}>
                <Group justify='space-between' align='center'>
                    <Text size='sm'>Mengubah Tim Kerja</Text>
                    <Group justify='flex-end'>
                        <ButtonOutlineWithRoute label={'Kembali'} route={route('admin.user-management.tim-kerja')} />
                        <Button radius={'xs'} type='submit' loading={loading} className='hover:opacity-60 transition'>
                            Simpan
                        </Button>
                    </Group>
                </Group>
                <Grid>
                    <Grid.Col span={isMobile ? 12 : 6}>
                        <Stack gap={'xs'}>
                            <TextInput
                                label="Nama Tim Kerja"
                                placeholder='Masukkan nama tim kerja ...'
                                radius={"xs"}
                                size='sm'
                                {...form.getInputProps('nama')}
                            />
                            <Select
                                label="Ketua Tim Kerja"
                                placeholder='Pilih ketua tim kerja ...'
                                data={users.map((user) => ({
                                    label: user.nama,
                                    value: `${user.id}`
                                }))}
                                value={selectedKetua ? selectedKetua.value : null}
                                onChange={(_value, option) => setSelectedKetua(option)}
                                nothingFoundMessage="Tidak ditemukan"
                                searchable
                            />
                            <TextInput
                                label="Nama Ketua"
                                radius={"xs"}
                                size='sm'
                                {...form.getInputProps('namaKetua')}
                                variant='filled'
                                readOnly
                            />
                            <TextInput
                                label="NIP Ketua"
                                radius={"xs"}
                                size='sm'
                                {...form.getInputProps('nipKetua')}
                                variant='filled'
                                readOnly
                            />
                        </Stack>
                    </Grid.Col>
                </Grid>
            </Stack>

        </form>
    )
}


UpdateTImKerja.layout = page => (
    <UserLayout session={page.props.user} title="Pengelolaan User">
        <AdminUserManagementLayout children={page} />
    </UserLayout>
)

export default UpdateTImKerja