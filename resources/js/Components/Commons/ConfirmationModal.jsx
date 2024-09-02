import React, { useState } from 'react'
import { Modal, Button, Text, Group } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { router } from '@inertiajs/react';

const ConfirmationModal = ({ opened, close, selectedRecord, label = "menghapus", urlDelete, urlRevisit, only }) => {
    const { hovered, ref } = useHover();
    const [loading, setLoading] = useState();
    const handleDelete = (recordId) => {
        setLoading(true);
        router.delete(route(urlDelete, { id: recordId }), {
            onSuccess: () => {
                setLoading(false);
                close();
                router.visit(route(urlRevisit), {
                    only: [{ only }],
                    preserveScroll: true,
                })
            },
        });
    };

    return (
        <>
            <Modal opened={opened} onClose={close} title="Konfirmasi Tindakan">
                {/* Modal content */}
                {selectedRecord && (
                    <Text size='sm'>Apakah anda yakin untuk <span className='font-bold text-red-600'>{label} "{selectedRecord.nama}" </span> ? </Text>
                )}
                <Group justify='flex-end' align='center' mt={'md'} gap={'lg'}>
                    <Button ref={ref} opacity={hovered ? .6 : 1} onClick={() => handleDelete(selectedRecord.id)} radius={'xs'} className='transition duration-300' loading={loading}>Yakin</Button>
                    <Button onClick={close} variant='outline' color='red' radius={'xs'}>Batal</Button>
                </Group>
            </Modal>
        </>
    )
}

export default ConfirmationModal