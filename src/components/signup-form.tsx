/** @format */

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

export function SignupForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<'div'>) {
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
									required
								/>
							</div>
							<div className='grid gap-4'>
								<Label htmlFor='email'>Email</Label>
								<Input
									id='email'
									type='email'
									placeholder='m@example.com'
									required
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
								/>
							</div>
							<Button
								type='submit'
								className='w-full'>
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
