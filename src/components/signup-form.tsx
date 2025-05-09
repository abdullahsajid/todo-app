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
import { useState } from 'react';
import UserService from '../services/user-service';
import Cookies from "universal-cookie";
import toast from 'react-hot-toast';
const cookie = new Cookies();

export function SignupForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<'div'>) {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});

	const handlerSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const { name, email, password } = formData;
		if (!name || !email || !password) {
			toast.error('Please fill all fields');
			return;
		}
		try {
			const res = await UserService.signUp(formData);
			console.log('res', res);
			if (res.statusCode == 400 || res.statusCode == 500) {
				toast.error(`Something went wrong`);
				return;
			}
			if (res.token) {
				cookie.set("todo-app", res.token);
				toast.success('User created successfully');
			}
		} catch (error) {
			toast.error('Error creating user');
			console.log('error', error);
		}
	};

	return (
		<div
			className={cn('flex flex-col gap-6', className)}
			{...props}>
			<Card>
				<CardHeader>
					<CardTitle className='text-2xl'>Sign Up</CardTitle>
					<CardDescription>
						Enter your name, email and password below to create to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className='flex flex-col gap-6'>
							<div className='grid gap-4'>
								<Label htmlFor='name'>Name</Label>
								<Input
									id='name'
									type='text'
									placeholder='John Doe'
									value={formData.name}
									onChange={(e) =>
										setFormData({ ...formData, name: e.target.value })
									}
								/>
							</div>
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
								className='w-full'
								onClick={handlerSubmit}
							>
								Sign Up
							</Button>
						</div>
						<div className='mt-6 text-center text-sm'>
							Already have account?{''}
							<Link
								href='/login'
								className='underline underline-offset-4'>
								Sign in
							</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
