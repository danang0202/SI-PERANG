import React, { useState } from 'react'
import { Modal, Button, Text, Group } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { router } from '@inertiajs/react';

const ConfirmationModalPengajuan = ({ opened, close, selectedRecord, label, urlPatch, urlRevisit, only }) => {
    const { hovered, ref } = useHover();
    const [loading, setLoading] = useState();
    const handleConfirm = (recordId) => {
        setLoading(true);
        router.get(route(urlPatch , { id: recordId }), {
            onSuccess: () => {
                setLoading(false);
                close();
                router.visit(route(urlRevisit), {
                    only: [{ only }],
                });
            },
            onError: (errors) => {
                setLoading(false);
                console.error('Error:', errors); // Log errors to the console for debugging
                // You can also show an error notification or handle errors here
            },
        });
    };


    return (
        <>
            <Modal opened={opened} onClose={close} title="Konfirmasi Tindakan">
                {/* Modal content */}
                {selectedRecord && (
                    <Text size='sm'>Apakah anda yakin untuk <span className='font-bold text-red-600'>{label || 'membatalkan'} pengajuan dengan nomor id [ {selectedRecord.id} ] </span> ? </Text>
                )}
                <Group justify='flex-end' align='center' mt={'md'} gap={'lg'}>
                    <Button ref={ref} opacity={hovered ? .6 : 1} onClick={() => handleConfirm(selectedRecord.id)} radius={'xs'} className='transition duration-300' loading={loading}>Yakin</Button>
                    {/* Kalau yakin arahkan  ke action delete                     */}
                    <Button onClick={close} variant='outline' color='red' radius={'xs'}>Batal</Button>
                </Group>
            </Modal>
        </>
    )
}

export default ConfirmationModalPengajuan