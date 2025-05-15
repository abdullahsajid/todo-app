/** @format */

'use client';
import { cn } from '@/lib/utils';
import { Button } from '@/src/components/shadcn-ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/src/components/shadcn-ui/card';
import { Input } from '@/src/components/shadcn-ui/input';
import { Label } from '@/src/components/shadcn-ui/label';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import UserService from '../services/user-service';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';
import { Elsie_Swash_Caps } from 'next/font/google';
const cookie = new Cookies();

export function LoginForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<'div'>) {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handlerSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		const { email, password } = formData;
		if (!email || !password) {
      toast.error('Please fill all fields');
      setIsLoading(false);
			return;
		}
		try {
			const res = await UserService.login(formData);
			if (res.statusCode == 400 || res.statusCode == 500) {
				toast.error(`Something went wrong`);
				setIsLoading(false);

				return;
			}
			if (res.token) {
				localStorage.setItem('todo-user', JSON.stringify(res.user));
				cookie.set('todo-app', res.token);
				toast.success('User created successfully');
				router.push('/dashboard');
				setIsLoading(false);
			} else {
				toast.error('Invalid credentials');
				setIsLoading(false);
			}
		} catch (error) {
			toast.error('Error Something went wrong');
			console.log('error', error);
			setIsLoading(false);
		}
	};

	return (
		<div
			className={cn('flex flex-col gap-6', className)}
			{...props}>
			<Card>
				<CardHeader>
					<CardTitle className='text-2xl'>Login</CardTitle>
					<CardDescription>
						Enter your email below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className='flex flex-col gap-6'>
							<div className='grid gap-4'>
								<Label htmlFor='email'>Email</Label>
								<Input
									id='email'
									type='email'
									placeholder='m@example.com'
									required
									value={formData.email}
									onChange={(e) =>
										setFormData({ ...formData, email: e.target.value })
									}
								/>
							</div>
							<div className='grid gap-2'>
								<div className='flex items-center'>
									<Label htmlFor='password'>Password</Label>
								</div>
								<Input
									id='password'
									type='password'
									required
									placeholder='********'
									value={formData.password}
									onChange={(e) =>
										setFormData({ ...formData, password: e.target.value })
									}
								/>
							</div>
							<Button
								type='submit'
								className='w-full disabled:opacity-50 disabled:cursor-not-allowed'
                onClick={handlerSubmit}
                disabled={isLoading}
              >
								Login
							</Button>
						</div>
						<div className='mt-6 text-center text-sm'>
							Don&apos;t have an account?{''}
							<Link
								href='/sign-up'
								className='underline underline-offset-4'>
								Sign up
							</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
