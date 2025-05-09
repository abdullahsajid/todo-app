/** @format */

import React, { useEffect, useState } from 'react';
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
import toast from 'react-hot-toast';
import UserService from '@/src/services/user-service';

const EditTodo = ({ getTodos, setIsOpen, editItem,setEditItem }: any) => {
	const [formData, setFormData] = useState({
		title: '',
		description: '',
	});

	const handlerSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const { title } = formData;
		if (!title) {
			toast.error('Please fill all fields');
			return;
		}
		try {
			const res = await UserService.createTodo(formData);
			if (res.statusCode == 400 || res.statusCode == 500) {
				toast.error(`Something went wrong`);
				return;
			}
			if (res) {
				toast.success('Todo created successfully');
				getTodos();
				setIsOpen(false);
				setFormData({
					title: '',
					description: '',
				});
			}
		} catch (error) {
			toast.error('Error Something went wrong');
			console.log('error', error);
		}
	};

	useEffect(() => {
		if (editItem) {
			setFormData({
				title: editItem.title,
				description: editItem.description,
			});
		}
	}, [editItem]);

	const handlerEdit = async (e: React.FormEvent) => {
		e.preventDefault();
		const { title } = formData;
		if (!title) {
			toast.error('Please fill all fields');
			return;
		}
		try {
			const res = await UserService.updateTodo(formData,editItem._id);
			if (res.statusCode == 400 || res.statusCode == 500) {
				toast.error(`Something went wrong`);
				return;
			}
			if (res) {
				toast.success('Todo updated successfully');
				getTodos();
				setIsOpen(false);
				setFormData({
					title: '',
					description: '',
        });
        setEditItem({
          title: '',
          description: '',
        });
			}
		} catch (error) {
			toast.error('Error Something went wrong');
			console.log('error', error);
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-2xl'>{editItem.title ? 'Update' : 'Create'} Todo</CardTitle>
				<CardDescription>
					Edit your todo below to update the information
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='flex flex-col gap-6'>
					<div className='grid gap-4'>
						<Label htmlFor='title'>Title</Label>
						<Input
							id='title'
							type='text'
							placeholder='Todo Title'
							required
							value={formData.title}
							onChange={(e) =>
								setFormData({ ...formData, title: e.target.value })
							}
						/>
					</div>
					<div className='grid gap-2'>
						<div className='flex items-center'>
							<Label htmlFor='description'>Description</Label>
						</div>
						<Input
							id='description'
							placeholder='description here'
							type='text'
							value={formData.description}
							onChange={(e) =>
								setFormData({ ...formData, description: e.target.value })
							}
						/>
					</div>
					<Button
						className='w-full'
						onClick={editItem.title ? handlerEdit : handlerSubmit}>
						{editItem.title ? 'Update' : 'Create'}
					</Button>
				</div>
				{/* </form> */}
			</CardContent>
		</Card>
	);
};

export default EditTodo;
