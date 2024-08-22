import React, { useState } from 'react';
import { Text } from '@mantine/core';
import UserLayout from '@/Layout/UserLayout';

const Test = () => {
    return (
        <UserLayout>
            <Text size='base' bg={"red"}>Halo test</Text>
        </UserLayout>
    )
}

export default Test