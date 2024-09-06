import ButtonOutlineWithRoute from '@/Components/Commons/ButtonOutlineWithRoute'
import AdminInventarisBarangLayout from '@/Layout/AdminInventarisBarangLayout'
import UserLayout from '@/Layout/Layout'
import { Button, Grid, Group, Stack, Text, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import React, { useEffect, useState } from 'react'
import { Inertia } from '@inertiajs/inertia'
import { jenisBarangSchema } from '@/Schema/inventaris-barang.schema'
import { usePage } from '@inertiajs/react'

const UpdateJenisBarang = ({ prevJenisBarang }) => {
    const { errors } = usePage().props
    const [loading, setLoading] = useState();
    const form = useForm({
        mode: 'controlled',
        initialValues: {
            kode: prevJenisBarang.kode,
            nama: prevJenisBarang.nama,
        },

        validate: zodResolver(jenisBarangSchema)
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
        setLoading(true);
        Inertia.post(route('admin.inventaris-barang.jenis.update.action', { id: prevJenisBarang.id }), values, {
            onSuccess: () => {
                console.log('Data berhasil disimpan');
            },
            onError: (errors) => {
                console.error(errors);
            }
        });
    };

    return (
        <>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap={"md"}>
                    <Group justify='space-between' align='center'>
                        <Text size='sm'>Menambahkan Jenis Barang</Text>
                        <Group justify='flex-end'>
                            <ButtonOutlineWithRoute label={'Kembali'} route={route('admin.inventaris-barang.jenis')} />
                            <Button radius={'xs'} type='submit' loading={loading}>
                                Simpan
                            </Button>
                        </Group>
                    </Group>
                    {/* Form */}
                    <Grid>
                        <Grid.Col span={{ base: 12, lg: 6 }}>
                            <TextInput
                                withAsterisk
                                label="Kode"
                                placeholder="Masukkan kode barang..."
                                key={form.key('kode')}
                                {...form.getInputProps('kode')}
                            />
                            <TextInput
                                withAsterisk
                                label="Nama"
                                placeholder="Masukkan jenis barang..."
                                key={form.key('nama')}
                                {...form.getInputProps('nama')}
                                onChange={(event) => {
                                    form.setFieldValue('nama', event.currentTarget.value.toUpperCase());
                                }}
                            />
                        </Grid.Col>
                    </Grid>
                </Stack>
            </form>
        </>
    )
}

UpdateJenisBarang.layout = page => (
    <UserLayout session={page.props.user} title={"Inventaris Barang"}>
        <AdminInventarisBarangLayout children={page} />
    </UserLayout>
)
export default UpdateJenisBarang