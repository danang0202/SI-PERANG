import { Head } from '@inertiajs/react'
import { Box } from '@mantine/core'
import React from 'react'

const FramePDF = ({ pengajuanId }) => {
    return (
        <Box h={'100vh'}>
            <Head title='Cetak Surat' />
            <iframe
                src={route('streamPDF', { id: pengajuanId ? pengajuanId : '' })}
                width="100%"
                height="100%"
                title="PDF Viewer"
            />
        </Box>
    )
}

export default FramePDF