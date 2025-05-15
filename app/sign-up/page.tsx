/** @format */

'use client';
import { SignupForm } from '@/src/components/signup-form';
import React, { useEffect } from 'react';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';
const cookie = new Cookies();

const SignUp = () => {
	const router = useRouter();
	useEffect(() => {
		const auth = async () => {
			let token = cookie.get('todo-app');
			if (token) {
				router.replace('/dashboard');
			} else {
				router.replace('/sign-up');
			}
		};
		auth();
	}, []);

	return (
		<div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
			<div className='w-full max-w-sm'>
				<SignupForm />
			</div>
		</div>
	);
};

export default SignUp;
