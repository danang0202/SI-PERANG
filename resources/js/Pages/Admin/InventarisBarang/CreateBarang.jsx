import ButtonOutlineWithRoute from '@/Components/Commons/ButtonOutlineWithRoute';
import AdminInventarisBarangLayout from '@/Layout/AdminInventarisBarangLayout';
import UserLayout from '@/Layout/Layout';
import { barangSchema } from '@/Schema/inventaris-barang.schema';
import { router, usePage } from '@inertiajs/react';
import { Button, Grid, Group, NumberInput, Select, Stack, Text, TextInput, useMantineTheme } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import React, { useEffect, useState } from 'react'

const CreateBarang = ({ jenisBarangs, satuanBarangs }) => {
    const theme = useMantineTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
    const { errors } = usePage().props

    const [selectedJenisBarang, setSelectedJenisBarang] = useState();
    const jenisBarangOptions = jenisBarangs.map(item => ({
        value: item.id.toString(),
        label: item.nama
    }));

    const satuanBarangOptions = satuanBarangs.map(item => ({
        value: item.id.toString(),
        label: item.nama
    }));

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

    const [loading, setLoading] = useState();
    const form = useForm({
        mode: 'controlled',
        initialValues: {
            kode: '',
            nama: '',
            jenisBarangId: '',
            satuanId: '',
            jumlah: '',
        },

        validate: zodResolver(barangSchema)
    });


    const handleSubmit = (values) => {
        const temp = selectedJenisBarang.kode + values.kode;
        values.kode = temp;
        setLoading(true)
        router.post(route('admin.inventaris-barang.create.action'), values, {
        });
    };


    useEffect(() => {
        const temp = jenisBarangs.find((item) => item.id.toString() === form.values.jenisBarangId)
        setSelectedJenisBarang(temp);
    }, [form.values.jenisBarangId])

    return (
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <Stack gap={"md"}>
                <Group justify='space-between' align='center'>
                    <Text size='sm'>Menambahkan Barang</Text>
                    <Group justify='flex-end'>
                        <ButtonOutlineWithRoute label={'Kembali'} route={route('admin.inventaris-barang')} />
                        <Button radius={'xs'} type='submit' loading={loading}>
                            Simpan
                        </Button>
                    </Group>
                </Group>
                <Grid gutter={{ base: 'md', lg: "lg" }}>
                    <Grid.Col span={isMobile ? 12 : 7}>
                        <Stack gap={"lg"}>
                            <Grid>
                                <Grid.Col span={5}>
                                    <TextInput
                                        label="Kode Jenis Barang"
                                        radius={"xs"}
                                        size='sm'
                                        value={selectedJenisBarang ? selectedJenisBarang.kode : ''}
                                        variant='filled'
                                    />
                                </Grid.Col>
                                <Grid.Col span={7}>
                                    <TextInput
                                        label="Kode Barang"
                                        placeholder="Masukkan kode barang ..."
                                        radius={"xs"}
                                        size='sm'
                                        withAsterisk
                                        key={form.key('kode')}
                                        {...form.getInputProps('kode')}
                                    />
                                </Grid.Col>
                            </Grid>
                            <TextInput
                                label="Nama Barang"
                                placeholder="Masukkan nama barang"
                                radius={"xs"}
                                withAsterisk
                                key={form.key('nama')}
                                {...form.getInputProps('nama')}
                                onChange={(event) => {
                                    form.setFieldValue('nama', event.currentTarget.value.toUpperCase());
                                }}
                            />
                            <Select
                                label="Jenis Barang"
                                placeholder="Pilih jenis barang..."
                                data={jenisBarangOptions} // Menggunakan data yang telah dipetakan
                                searchable
                                nothingFoundMessage="Nothing found..."
                                radius={'xs'}
                                withAsterisk
                                key={form.key('jenisBarangId')}
                                {...form.getInputProps('jenisBarangId')}
                            />
                        </Stack>
                    </Grid.Col>
                    <Grid.Col span={isMobile ? 12 : 5}>
                        <Stack gap={"lg"}>
                            <NumberInput
                                withAsterisk
                                label="Jumlah Barang"
                                placeholder="Masukkan jumlah barang"
                                radius={"xs"}
                                key={form.key('jumlah')}
                                {...form.getInputProps('jumlah')}
                            />
                            <Select
                                withAsterisk
                                label="Satuan Barang"
                                placeholder="Pilih satuan barang..."
                                data={satuanBarangOptions}
                                searchable
                                nothingFoundMessage="Nothing found..."
                                radius={'xs'}
                                key={form.key('satuanId')}
                                {...form.getInputProps('satuanId')}
                            />
                        </Stack>
                    </Grid.Col>
                </Grid>
            </Stack>
        </form >
    )
}

CreateBarang.layout = page => (
    <UserLayout session={page.props.user} title={"Inventaris Barang"}>
        <AdminInventarisBarangLayout children={page} />
    </UserLayout>
)

export default CreateBarang;
