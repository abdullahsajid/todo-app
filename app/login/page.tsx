'use client';
import { LoginForm } from '@/src/components/login-form';
import React, { useEffect } from 'react';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';
const cookie = new Cookies();

const Login = () => {
	const router = useRouter();
	useEffect(() => {
		const auth = async () => {
			let token = cookie.get('todo-app');
			if (token) {
				router.replace('/dashboard');
			} else {
				router.replace('/login');
			}
		};
		auth();
	}, []);

	return (
		<div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
			<div className='w-full max-w-sm'>
				<LoginForm />
			</div>
		</div>
	);
};

export default Login;
