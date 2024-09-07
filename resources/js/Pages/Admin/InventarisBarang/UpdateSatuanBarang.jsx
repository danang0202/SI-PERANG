import ButtonOutlineWithRoute from '@/Components/Commons/ButtonOutlineWithRoute'
import AdminInventarisBarangLayout from '@/Layout/AdminInventarisBarangLayout'
import UserLayout from '@/Layout/Layout'
import { Button, Group, Stack, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useEffect, useState } from 'react'
import { router } from '@inertiajs/react'

const UpdateSatuanBarang = ({ prevSatuanBarang, status }) => {
    const [loading, setLoading] = useState();
    useEffect(() => {
        if (status && status.type == 'fail') {
            showFailNotification(status.message)
        }
    }, [status])

    const form = useForm({
        mode: 'controlled',
        initialValues: {
            nama: prevSatuanBarang.nama,
        },

        validate: {
            nama: (value) => {
                // Memeriksa apakah nilai kosong atau hanya berisi spasi
                if (!value.trim()) {
                    return 'Nama tidak boleh kosong atau hanya berisi spasi';
                }

                // Memeriksa apakah nilai hanya berisi huruf (termasuk huruf dengan diakritik dan spasi)
                if (!/^[A-Za-z\s]+$/.test(value)) {
                    return 'Nama hanya boleh berisi huruf dan spasi';
                }
                // Jika tidak ada masalah, kembalikan `null` (validasi lulus)
                return null;
            },
        },
    });

    const handleSubmit = (values) => {
        setLoading(true)
        router.post(route('admin.inventaris-barang.satuan.update.action', { id: prevSatuanBarang.id }), values, {
            onSuccess: () => {
                setLoading(false);
            },
            onError: () => {
                setLoading(false);
                console.log("Error handle submit create satuan");
            }
        });
    };

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap={"md"}>
                <Group justify='space-between' align='center'>
                    <Text size='sm'>Update Satuan Barang</Text>
                    <Group justify='flex-end'>
                        <ButtonOutlineWithRoute label={'Kembali'} route={route('admin.inventaris-barang.satuan')} />
                        <Button radius={'xs'} type='submit' loading={loading}>
                            Simpan
                        </Button>
                    </Group>
                </Group>
                {/* Form */}
                <TextInput
                    withAsterisk
                    label="Nama"
                    placeholder="Masukkan satuan barang..."
                    key={form.key('nama')}
                    {...form.getInputProps('nama')}
                    onChange={(event) => {
                        form.setFieldValue('nama', event.currentTarget.value.toUpperCase());
                    }}
                />
            </Stack>
        </form>)
}


UpdateSatuanBarang.layout = page => (
    <UserLayout session={page.props.user} title={"Inventaris Barang"}>
        <AdminInventarisBarangLayout children={page} />
    </UserLayout>
)


export default UpdateSatuanBarang