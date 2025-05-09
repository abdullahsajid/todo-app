/** @format */
'use client';
import Navbar from '@/src/components/header';
import ModalWrapper from '@/src/components/modal-wrapper';
import TodoEdit from '@/src/components/modals/todo-edit';
import { Button } from '@/src/components/shadcn-ui/button';
import { TodoItems } from '@/src/components/todo';
import UserService from '@/src/services/user-service';
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const getTodos = async () => {
    try {
      const response = await UserService.getTodo();
      console.log('Todos:', response);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }

  useEffect(() => {
    getTodos();
  },[])

	return (
		<div>
			<ModalWrapper
				onOpenChange={setIsOpen}
				isOpen={isOpen}>
				<TodoEdit />
			</ModalWrapper>
			<Navbar />
			<div className='p-5 flex flex-col items-center'>
				<Button onClick={() => setIsOpen(true)}>+ Create</Button>
			</div>
			<div className='flex flex-col items-center h-screen p-5'>
				<TodoItems />
			</div>
		</div>
	);
};

export default Dashboard;
