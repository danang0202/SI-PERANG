import React, { useState } from 'react'
import { Modal, Button, Text, Group } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { router } from '@inertiajs/react';

const ConfirmationModalNonaktif = ({ opened, close, selectedRecord, urlPatch, only }) => {
    const { hovered, ref } = useHover();
    const [loading, setLoading] = useState();
    const handleConfirm = (recordId) => {
        setLoading(true);
        router.get(route(urlPatch, { id: recordId, status: selectedRecord.status == 'AKTIF' ? 'NONAKTIF' : 'AKTIF' }), {
            onSuccess: () => {
                setLoading(false);
                close();
                router.visit(window.location.pathname, {
                    only: [{ only }],
                });
            },
            onError: (errors) => {
                setLoading(false);
                console.error('Error:', errors);
            },
        });
    };

    return (
        <>
            <Modal opened={opened} onClose={close} title="Konfirmasi Tindakan">
                {/* Modal content */}
                {selectedRecord && (
                    <Text size='sm'>Apakah anda yakin untuk <span className={`font-bold ${selectedRecord.status == "AKTIF" ? 'text-red-600' : 'text-green-500'}`}>{selectedRecord.status == "AKTIF" ? 'menonaktifkan' : 'mengaktifkan'} user dengan nama "{selectedRecord.nama}" </span> ? </Text>
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

export default ConfirmationModalNonaktif