import './bootstrap';
import '../css/app.css';
import '@mantine/core/styles.css';
import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';
import '@mantine/notifications/styles.css';
import "@mantine/dates/styles.css";


import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { MantineProvider } from '@mantine/core';
import { mantineProviderProps } from './constan/mantine.constan';
import { MenuProvider } from './Provider/Menu';
import { Notifications } from '@mantine/notifications';
const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <MantineProvider {...mantineProviderProps} defaultColorScheme='light'>
                <MenuProvider>
                    <Notifications />
                    <App {...props} />
                </MenuProvider>
            </MantineProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
