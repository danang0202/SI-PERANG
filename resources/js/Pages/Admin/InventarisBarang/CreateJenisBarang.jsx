import ButtonOutlineWithRoute from '@/Components/Commons/ButtonOutlineWithRoute'
import AdminInventarisBarangLayout from '@/Layout/AdminInventarisBarangLayout'
import UserLayout from '@/Layout/Layout'
import { Button, Grid, Group, Stack, Text, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import React, { useEffect, useState } from 'react'
import { router, usePage } from '@inertiajs/react'
import { jenisBarangSchema } from '@/Schema/inventaris-barang.schema'

const CreateJenisBarang = ({  }) => {
    const { errors } = usePage().props
    const [loading, setLoading] = useState();
    const form = useForm({
        mode: 'controlled',
        initialValues: {
            kode: '',
            nama: '',
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
        setLoading(true)
        router.post(route('admin.inventaris-barang.jenis.create.action'), values, {
        });
    };

    return (
        <>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap={"md"}>
                    <Group justify='space-between' align='center'>
                        <Text size='sm'>Tambah Jenis Barang</Text>
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
                                mt={"md"}
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

CreateJenisBarang.layout = page => (
    <UserLayout session={page.props.user} title={"Inventaris Barang"}>
        <AdminInventarisBarangLayout children={page} />
    </UserLayout>
)

export default CreateJenisBarang
