import './bootstrap';
import '../css/app.css';
import '@mantine/core/styles.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { MantineProvider } from '@mantine/core';
import { mantineProviderProps } from './constan/mantine.constan';
import { MenuProvider } from './Provider/Menu';
import UserLayout from './Layout/UserLayout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        const noLayoutRoutes = ['/login', '/register'];
        const shouldUseLayout = !noLayoutRoutes.includes(window.location.pathname);
        root.render(
            <MantineProvider {...mantineProviderProps}>
                <MenuProvider>
                    {shouldUseLayout ? (
                        <UserLayout>
                            <App {...props} />
                        </UserLayout>
                    ) : (
                        <App {...props} />
                    )}
                </MenuProvider>
            </MantineProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
