/** @format */

'use client';
import { useEffect, useState } from 'react';
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from '@/src/components/shadcn-ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/src/components/shadcn-ui/dropdown-menu';
import { LogOut } from 'lucide-react';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';
const cookie = new Cookies();

export default function Navbar() {
	const [user, setUser] = useState({
		name: 'Ali',
		email: 'john.doe@example.com',
		avatarUrl: '/api/placeholder/40/40',
	});
	const router = useRouter();
	const handleLogout = () => {
		localStorage.removeItem('todo-user');
		cookie.remove('todo-app');
		router.replace('/');
	};

	useEffect(() => {
		const storedUser = localStorage.getItem('todo-user');
		if (storedUser) {
			const parsedUser = JSON.parse(storedUser);
			setUser({
				name: parsedUser.name,
				email: parsedUser.email,
				avatarUrl: parsedUser.avatarUrl || '/api/placeholder/40/40',
			});
		}
	}, []);

	return (
		<header className='border-b'>
			<div className='flex h-16 items-center px-4 md:px-6'>
				<div className='flex items-center'>
					{/* Logo */}
					<div className='flex items-center space-x-2'>
						<div className='w-8 h-8 bg-primary rounded-md flex items-center justify-center'>
							<span className='text-white font-bold'>T</span>
						</div>
						<span className='text-lg font-semibold'>Todo App</span>
					</div>
				</div>

				<div className='ml-auto flex items-center space-x-4'>
					{/* Avatar with Dropdown */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button className='flex items-center space-x-2 rounded-full outline-none ring-offset-2 focus:ring-2 focus:ring-primary focus:ring-offset-2'>
								<Avatar className='h-8 w-8 cursor-pointer'>
									<AvatarImage
										src={user.avatarUrl}
										alt={user.name}
									/>
									<AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
								</Avatar>
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align='end'
							className='w-56'>
							<DropdownMenuLabel className='font-normal'>
								<div className='flex flex-col space-y-1'>
									<p className='text-sm font-medium leading-none'>
										{user.name}
									</p>
									<p className='text-xs leading-none text-gray-500'>
										{user.email}
									</p>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuSeparator />
							<DropdownMenuItem
								className='cursor-pointer'
								onClick={handleLogout}>
								<LogOut className='mr-2 h-4 w-4' />
								<span>Logout</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
}
