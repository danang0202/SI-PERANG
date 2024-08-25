import { Link } from '@inertiajs/react'
import { Button } from '@mantine/core'
import { useHover } from '@mantine/hooks'
import React from 'react'

const ButtonWithRoute = ({ label, route, leftSection, method }) => {
    const { hovered, ref } = useHover();
    return (
        <Link href={route} method={method || 'get'} ref={ref}>
            <Button
                leftSection={leftSection || ''}
                radius={'xs'}
                variant='gradient'
                opacity={hovered ? .6 : 1}
                gradient={hovered ? { from: 'blue', to: 'cyan', deg: 270 } : { from: 'blue', to: 'cyan', deg: 90 }}
                className='transition duration-300'
            >
                {label}
            </Button>
        </Link>
    )
}

export default ButtonWithRoute
