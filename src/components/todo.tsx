import * as React from "react"

import { Button } from "@/src/components/shadcn-ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/shadcn-ui/card"

export function TodoItems() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Title</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
      </CardContent>
      <CardFooter className="flex justify-center space-x-2">
        <Button>Edit</Button>
      </CardFooter>
    </Card>
  )
}
