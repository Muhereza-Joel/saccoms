import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, permissions }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            permissions={permissions}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Sacco Transactions</h2>}
        >
            <Head title="Dashboard" />

            
        </AuthenticatedLayout>
    );
}
