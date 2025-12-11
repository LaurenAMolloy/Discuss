'use server'

//take signin and signout 
import * as auth from '@/auth'

//server actions
//use sign in methods from auth!
export async function signIn(){
    return auth.signIn('github')
}