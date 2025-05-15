/** @format */
'use client';
import Navbar from '@/src/components/header';
import ModalWrapper from '@/src/components/modal-wrapper';
import TodoEdit from '@/src/components/modals/todo-edit';
import { Button } from '@/src/components/shadcn-ui/button';
import { TodoItems } from '@/src/components/todo';
import UserService from '@/src/services/user-service';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
const cookie = new Cookies();

const Dashboard = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [todos, setTodos] = useState([]);
	const [editItem, setEditItem] = useState({
		title: '',
		description: '',
	});
	const router = useRouter();
	const getTodos = async () => {
		try {
			const response = await UserService.getTodo();
			if (response) {
				setTodos(response);
			}
		} catch (error) {
			console.error('Error fetching todos:', error);
		}
	};

	useEffect(() => {
		const auth = async () => {
			let token = cookie.get('todo-app');
			if (!token) {
				router.replace('/');
			}
		};
		auth();
	}, []);

	useEffect(() => {
		getTodos();
	}, []);

	const getItem = (item: any) => {
		setEditItem(item);
		setIsOpen(true);
	};

	return (
		<div>
			<ModalWrapper
				onOpenChange={setIsOpen}
				isOpen={isOpen}>
				<TodoEdit
					getTodos={getTodos}
					setIsOpen={setIsOpen}
					editItem={editItem}
					setEditItem={setEditItem}
				/>
			</ModalWrapper>
			<Navbar />
			<div className='p-5 flex flex-col items-center'>
				<Button onClick={() => setIsOpen(true)}>+ Create</Button>
			</div>
			<div className='flex flex-wrap gap-3 p-5'>
				{todos.length > 0 ? (
					todos.map((todo, index) => (
						<TodoItems
							key={index}
							todo={todo}
							getItem={getItem}
							getTodos={getTodos}
						/>
					))
				) : (
					<div className='text-center'>No Todos Available</div>
				)}
			</div>
		</div>
	);
};

export default Dashboard;
