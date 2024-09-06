import ButtonOutlineWithRoute from '@/Components/Commons/ButtonOutlineWithRoute';
import { showFailNotification } from '@/helper/notification.helper';
import AdminInventarisBarangLayout from '@/Layout/AdminInventarisBarangLayout';
import UserLayout from '@/Layout/Layout';
import { barangSchema } from '@/Schema/inventaris-barang.schema';
import { router, usePage } from '@inertiajs/react';
import { Button, Grid, Group, NumberInput, Select, Stack, Text, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import React, { useEffect, useState } from 'react'

const UpdateBarang = ({ jenisBarangs, satuanBarangs, prevBarang, status }) => {
    const [selectedJenisBarang, setSelectedJenisBarang] = useState();
    const { errors } = usePage().props


    useEffect(() => {
        if (status && status.type == 'fail') {
            showFailNotification(status.message)
        }
    }, [status])
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
            kode: prevBarang.kode.slice(10),
            nama: prevBarang.nama,
            jenisBarangId: prevBarang.jenis_barang_id.toString(),
            satuanId: prevBarang.satuan_id.toString(),
            jumlah: prevBarang.jumlah,
        },

        validate: zodResolver(barangSchema)
    });


    const handleSubmit = (values) => {
        const temp = selectedJenisBarang.kode + values.kode;
        values.kode = temp;
        setLoading(true)
        router.post(route('admin.inventaris-barang.update.action', { id: prevBarang.id }), values, {
            onSuccess: () => {
                setLoading(false);
            },
            onError: () => {
                setLoading(false);
                console.log("Error handle submit create satuan");
            }
        });
    };

    useEffect(() => {
        const temp = jenisBarangs.find((item) => item.id.toString() === form.values.jenisBarangId)
        setSelectedJenisBarang(temp);
    }, [form.values.jenisBarangId], prevBarang)

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
                    <Grid.Col span={6}>
                        <Stack gap={"lg"}>
                            <Grid>
                                <Grid.Col span={5}>
                                    <TextInput
                                        label="Kode Jenis Barang"
                                        description="Kode depan / kode jenis  barang"
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
                                        description="Kode barang terdiri dari 6 digit angka"
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
                                description='Masukkan nama barang dengan sesuai'
                                placeholder="Masukkan nama barang"
                                radius={"xs"}
                                withAsterisk
                                key={form.key('nama')}
                                {...form.getInputProps('nama')}
                            />
                            <Select
                                label="Jenis Barang"
                                placeholder="Pilih jenis barang..."
                                description='Pilih salah satu dari jenis barang yang tersedia'
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
                    <Grid.Col span={6}>
                        <Stack gap={"lg"}>
                            <NumberInput
                                withAsterisk
                                label="Jumlah Barang"
                                placeholder="Masukkan jumlah barang"
                                description='Masukkan jumlah barang dalam angka'
                                radius={"xs"}
                                key={form.key('jumlah')}
                                {...form.getInputProps('jumlah')}
                            />
                            <Select
                                withAsterisk
                                label="Satuan Barang"
                                placeholder="Pilih satuan barang..."
                                description='Pilih salah satu dari satuan barang yang tersedia'
                                data={satuanBarangOptions} // Menggunakan data yang telah dipetakan
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

UpdateBarang.layout = page => (
    <UserLayout session={page.props.user} title={"Inventaris Barang"}>
        <AdminInventarisBarangLayout children={page} />
    </UserLayout>
)
export default UpdateBarang