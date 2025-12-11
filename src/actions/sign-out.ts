'use server'

//take signin and signout 
import * as auth from '@/auth'

export async function signOut(){
    return auth.signOut()
}