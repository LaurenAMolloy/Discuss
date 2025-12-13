'use server'

import type { Topic } from '@prisma/client';
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod';
import { auth } from '@/auth'
import { db } from '@/db'
import paths from '@/paths'

const createTopicSchema = z.object({
        name: z.string().min(3).regex(/[a-z-]/, { 
        message: "Must be lowercase or dashes without" 
    }),
    description: z.string().min(10)
});

interface CreateTopicFormState {
    errors: {
        name?: string[];
        description?: string[];
        _form?: string[];
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
        };
    }

    const session = await auth();
    if(!session || !session.user) {
        return {
            errors: {
                _form: ['You must be signed in to do this.']
            },
        };
    }
    
    //Topic is the database record created by prisma
    let topic: Topic;
    try {
        topic = await db.topic.create({
            data: {
                //this is the validated data object from zod
                //slug is a URL safe version of our name
                slug: result.data.name,
                description: result.data.description
            }
        });

    } catch (err:unknown) {
        if(err instanceof Error) {
            return {
                //return new form state with errors message!
                errors: {
                    _form: [err.message]
                }
            }
        } else {
            return {
                errors: {
                    _form: ['Something went wrong']
                }
            }
        }    
    }
    
    const slug = topic.slug
    //Revalidate the homepage
    revalidatePath('/')
    //Redirect cannot be stored in the try catch block
    console.log('TOPIC RESULT:', topic)
    redirect(paths.topicShowPath(slug))

}