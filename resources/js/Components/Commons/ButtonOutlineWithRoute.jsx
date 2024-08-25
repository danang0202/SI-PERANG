import { Link } from '@inertiajs/react'
import { Button } from '@mantine/core'
import React from 'react'

const ButtonOutlineWithRoute = ({ label, route, color }) => {
    return (
        <Link href={route}>
            <Button variant='outline' radius={"xs"} color={color || 'red'}>
                {label}
            </Button>
        </Link>
    )
}

export default ButtonOutlineWithRoute