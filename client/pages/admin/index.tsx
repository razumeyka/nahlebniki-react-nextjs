import { FC } from 'react';
import Head from "next/head";

import FullScreenLayout from '../../components/layout/FullScreenLayout';
import AuthForm from "../../components/admin/AuthForm";

const AdminLogin: FC = () => {
    return (
        <>
            <Head>
                <title>Admin</title>
            </Head>
            <FullScreenLayout>
                <AuthForm />
            </FullScreenLayout>
        </>
    );
}

export default AdminLogin;