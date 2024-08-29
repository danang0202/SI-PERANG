import { showFailNotification, showSuccesNotification } from '@/helper/notification.helper';
import { router } from '@inertiajs/react';
import { Button, Group, Modal, NumberInput, Stack, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form';
import React, { useState } from 'react'

const TambahStockModal = ({ opened, close, selectedRecord }) => {
    const [loading, setLoading] = useState();
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            stock: '',
        },
        validate: {
            stock: (value) => {
                if (!value) {
                    return 'Stock tidak boleh kosong';
                }
                return null;
            },
        },
    });

    const handleSubmit = (values) => {
        setLoading(true);
        router.post(route('admin.inventaris-barang.tambah-stock', { id: selectedRecord.id }), values, {
            onSuccess: (page) => {
                setLoading(false);
                close();
                form.reset();
                router.visit(route('admin.inventaris-barang'), {
                    only: ['barangs'],
                })
            },
        });
    }

    return (
        <Modal opened={opened} onClose={close} title="Formulir Tambah Stock">
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                <Stack gap={'md'}>
                    <Text size='sm'></Text>
                    <NumberInput
                        label="Tambahan stock"
                        placeholder="Masukkan tambahan stock ..."
                        description={`Masukkan tambahan stock dari barang ${selectedRecord ? selectedRecord.nama : ''}`}
                        radius={"xs"}
                        size='sm'
                        withAsterisk
                        key={form.key('stock')}
                        {...form.getInputProps('stock')}
                    />
                    <Group justify='flex-end' gap={'md'}>
                        <Button variant='outline' color='red' onClick={close} radius={'xs'}>
                            Batal
                        </Button>
                        <Button loading={loading} type='submit' radius={'xs'} className='hover:opacity-60 transition duration-200'>
                            Simpan
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    )
}

export default TambahStockModal