/** @format */

import * as React from 'react';

import { Button } from '@/src/components/shadcn-ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/src/components/shadcn-ui/card';
import toast from 'react-hot-toast';
import UserService from '../services/user-service';

export function TodoItems({ todo, getItem,getTodos }: any) {
	const handleDelete = async (id: string) => {
		try {
			const res = await UserService.deleteTodo(id);
			if (res.statusCode == 400 || res.statusCode == 500) {
				toast.error(`Something went wrong`);
				return;
			}
			if (res) {
				toast.success('Todo deleted successfully');
				getTodos();
			}
		} catch (error) {
			toast.error('Error Something went wrong');
			console.log('error', error);
		}
	};
	return (
		<Card className='w-[350px]'>
			<CardHeader>
				<CardTitle>{todo.title}</CardTitle>
				<CardDescription>{todo.description}</CardDescription>
			</CardHeader>
			<CardContent></CardContent>
			<CardFooter className='flex justify-center space-x-2'>
				<Button onClick={() => getItem(todo)}>Edit</Button>
				<Button variant={'destructive'} onClick={() => handleDelete(todo._id)}>Del</Button>
			</CardFooter>
		</Card>
	);
}
