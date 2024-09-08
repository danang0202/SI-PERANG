import ButtonOutlineWithRoute from '@/Components/Commons/ButtonOutlineWithRoute'
import { EXTENDED_COLOR } from '@/constan/mantine.constan'
import { showFailNotification, showSuccesNotification } from '@/helper/notification.helper'
import AdminUserManagementLayout from '@/Layout/AdminUserManagementLayout'
import UserLayout from '@/Layout/Layout'
import { updateUserSchema, userSchema } from '@/Schema/user-management.schema'
import { router, usePage } from '@inertiajs/react'
import { Button, Grid, Group, MultiSelect, PasswordInput, Select, Stack, Text, TextInput, useMantineTheme } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import React, { useEffect, useState } from 'react'


const dataRole = [
    { value: 'USER', label: 'USER' },
    { value: 'ADMIN', label: 'ADMIN' }
]

const UpdateUser = ({ user, timKerjas, status, prevUser }) => {
    const theme = useMantineTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
    const { errors } = usePage().props
    const [loading, setLoading] = useState(false);
    const [visiblePassword, { toggle: togglePassword }] = useDisclosure(false);
    const [visibleConfirmPassword, { toggle: toggleConfirmPassword }] = useDisclosure(false);
    useEffect(() => {
        if (status && status.type == 'success') {
            showSuccesNotification(status.message)
        } else if (status && status.type == 'fail') {
            showFailNotification(status.message)
        }
    }, [status])

    const prevTimKerjaId = prevUser.tim_kerjas.map((item) => `${item.id}`);

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            nama: prevUser.nama,
            username: prevUser.username,
            nip: prevUser.nip,
            role: prevUser.role,
            timKerjaId: prevTimKerjaId,
            password: '',
            confirmPassword: ''
        },
        validate: zodResolver(updateUserSchema)
    });

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
        router.post(route('admin.user-management.update.action', { id: prevUser.id }), values, {
        });
    };


    return (
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <Stack gap={'xs'}>
                <Group justify='space-between' align='center'>
                    <Text size='sm'>Update Pengguna</Text>
                    <Group justify='flex-end'>
                        <ButtonOutlineWithRoute label={'Kembali'} route={route('admin.user-management')} />
                        <Button radius={'xs'} type='submit' loading={loading} className='hover:opacity-60 transition'>
                            Simpan
                        </Button>
                    </Group>
                </Group>
                <Text fw={'bold'}>Informasi User</Text>
                <Grid gutter={{ base: 'md', lg: "lg" }}>
                    <Grid.Col span={isMobile ? 12 : 6}>
                        <Stack gap={'xs'}>
                            <TextInput
                                label="Nama User"
                                radius={"xs"}
                                size='sm'
                                key={form.key('nama')}
                                {...form.getInputProps('nama')}
                            />
                            <TextInput
                                label="Username User"
                                radius={"xs"}
                                size='sm'
                                key={form.key('username')}
                                {...form.getInputProps('username')}
                            />
                            <TextInput
                                label="Nomor Induk Pegawai"
                                radius={"xs"}
                                size='sm'
                                key={form.key('nip')}
                                {...form.getInputProps('nip')}
                            />
                        </Stack>
                    </Grid.Col>
                    <Grid.Col span={isMobile ? 12 : 6}>
                        <Stack gap={"xs"}>
                            <MultiSelect
                                label="Tim Kerja"
                                placeholder="Ketik untuk mencari dan menambahkan tim kerja"
                                searchable
                                data={timKerjas.map((tim) => ({
                                    label: tim.nama,
                                    value: `${tim.id}`
                                }))}
                                styles={{
                                    pillsList: {
                                        display: "block",
                                    },
                                    pill: {
                                        backgroundColor: EXTENDED_COLOR.secondaryBackground,
                                        borderRadius: 0,
                                        color: EXTENDED_COLOR.secondaryPurple,
                                        marginRight: "4px",
                                        marginBottom: "4px",
                                    },
                                }}
                                hidePickedOptions
                                withAsterisk
                                {...form.getInputProps("timKerjaId")}
                                radius={'xs'}
                            />
                            <Select
                                label="Role User"
                                placeholder="Pilih role user..."
                                data={dataRole}
                                searchable
                                nothingFoundMessage="Nothing found..."
                                radius={'xs'}
                                withAsterisk
                                {...form.getInputProps('role')}
                            />
                        </Stack>
                    </Grid.Col>
                </Grid>
                <Text fw={'bold'} mt={"md"}>Keamanan Akun</Text>
                <Grid>
                    <Grid.Col span={isMobile ? 12 : 6}>
                        <PasswordInput
                            label="Password"
                            visible={visiblePassword}
                            onVisibilityChange={togglePassword}
                            {...form.getInputProps('password')}
                        />
                    </Grid.Col>
                    <Grid.Col span={isMobile ? 12 : 6}>
                        <PasswordInput
                            label="Konfirmasi Password"
                            visible={visibleConfirmPassword}
                            onVisibilityChange={toggleConfirmPassword}
                            {...form.getInputProps('confirmPassword')}
                        />
                    </Grid.Col>
                </Grid>
            </Stack>

        </form>
    )
}


UpdateUser.layout = page => (
    <UserLayout session={page.props.user} title="Pengelolaan User">
        <AdminUserManagementLayout children={page} />
    </UserLayout>
)
export default UpdateUser