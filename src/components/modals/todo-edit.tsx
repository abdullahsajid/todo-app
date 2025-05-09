
import React from "react";
import { Button } from "@/src/components/shadcn-ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/shadcn-ui/card"
import { Input } from "@/src/components/shadcn-ui/input"
import { Label } from "@/src/components/shadcn-ui/label"

const EditTodo = () => {
  return (
    <Card>
    <CardHeader>
      <CardTitle className="text-2xl">Create Todo</CardTitle>
      <CardDescription>
        Edit your todo below to update the information
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form>
        <div className="flex flex-col gap-6">
          <div className="grid gap-4">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="Todo Title"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="description">Description</Label>
            </div>
            <Input id="description" placeholder="description here" type="text"/>
          </div>
          <Button type="submit" className="w-full">
            Create
          </Button> 
        </div>
      </form>
    </CardContent>
  </Card>
  );
};

export default EditTodo;
