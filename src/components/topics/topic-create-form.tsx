'use client'

import { useActionState } from "react";

import {
    Input,
    Button,
    Textarea,
    Popover,
    PopoverTrigger,
    PopoverContent
} from '@nextui-org/react'
import * as actions from '@/actions'

export default function TopicCreateForm() {
    const [formState, action] = useActionState(actions.createTopic, { errors: {}});

    //user clicks new topic
    //show popover with form
    //Create Data call server action
    return (
        <Popover placement="left">
        <PopoverTrigger>
            <Button color="primary">Create a Topic</Button>
        </PopoverTrigger>
        <PopoverContent>
            <form action={action}>
                <div className="flex flex-col gap-4 p-4 w-80">
                    <h3 className="text-lg">Create a Topic</h3>
                    <Input 
                    name="name" 
                    label="Name" 
                    labelPlacement="outside" 
                    placeholder="Name"></Input>
                    <Textarea
                    name="description" 
                    label='Description' 
                    labelPlacement='outside' 
                    placeholder='Describe your topic'></Textarea>
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </PopoverContent>
        </Popover>
    )
}