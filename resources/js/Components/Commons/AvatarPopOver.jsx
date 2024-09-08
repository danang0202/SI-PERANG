import React from "react";
import { Button, Group, Stack, Text } from "@mantine/core";
import AvatarImage from "./AvatarImage";
import { EXTENDED_COLOR } from "@/constan/mantine.constan";
import { Link } from "@inertiajs/react";
const AvatarPopOver = ({ session }) => {
    return (
        <Stack w={"100%"} align="center" gap={"xs"} p={"xs"}>
            <AvatarImage
                src={''}
                name={session.nama || ""}
                alt="It's me"
                backgroundColorIfRandom={EXTENDED_COLOR.bluePrimary}
                colorIfRandom={EXTENDED_COLOR.white}
                size="lg"
            />
            <Text mt={"md"} fw={500}>
                {session.nama?.toUpperCase()}
            </Text>
            <Text c={"gray1"} size="sm" mt={-10}>
                {session.nama} • {session.email}
            </Text>
            <Link href={route('logout')} method="post">
                <Button
                    variant="outline"
                    color="accent6"
                >
                    Logout
                </Button>
            </Link>
        </Stack>
    );
};

export default AvatarPopOver;
