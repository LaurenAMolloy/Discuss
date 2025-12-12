'use server'

import { z } from 'zod';

const createTopicSchema = z.object({
        name: z.string().min(3).regex(/[a-z-]/, { 
        message: "Must be lowercase or dashes without" 
    }),
    description: z.string().min(10)
});

interface CreateTopicFormState {
    errors: {
        name?: string[];
        description?: string[]
    }
}

export async function createTopic(
    formState: CreateTopicFormState, 
    formData: FormData
    ): Promise<CreateTopicFormState> {
    console.log(formData)
    //We are going to use ZOD!
    //Create a schema
    // const name = formData.get('name');
    // const description = formData.get('description');
    // console.log(name, description);

    const result = createTopicSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description')
    });

    //check if parsing was successful
    if(!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        }
    }

    return { 
        errors: {},
    }
    
    //Revalidate the homepage
}