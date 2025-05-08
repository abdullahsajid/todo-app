/** @format */
'use client';
import Navbar from '@/src/components/header';
import ModalWrapper from '@/src/components/modal-wrapper';
import TestModal from '@/src/components/modals/test-modal';
import { Button } from '@/src/components/shadcn-ui/button';
import { TodoItems } from '@/src/components/todo';
import React, { useState } from 'react';

const Dashboard = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div>
			<ModalWrapper
				onOpenChange={setIsOpen}
				isOpen={isOpen}>
				<TestModal />
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
