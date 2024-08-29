import { getStatusColor } from '@/helper/common.helper'
import { Box, Group, Text } from '@mantine/core'
import React from 'react'

const TextStatus = ({ status }) => {
    return (
        <Group gap={'xs'} align='center'>
            <Box w={12} h={12} bg={getStatusColor(status)}></Box>
            <Text lineClamp={1} c={getStatusColor(status)} size='xs' fw={'bolder'}>
                {status}
            </Text>
        </Group>
    )
}

export default TextStatus
