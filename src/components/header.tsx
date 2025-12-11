import Link from 'next/Link';

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Input,
    Button,
    Avatar
} from '@nextui-org/react';

import { auth } from '@/auth';

//Wait for the promise from auth to be resolved
export default async function Header() {
    const session = await auth();

     return (
        <Navbar className="shadow mb-6">
            <NavbarBrand>
                <Link href="/" className="font-bold">Discuss</Link>
            </NavbarBrand>

            <NavbarContent justify='center'>
                <NavbarItem>
                    <Input />
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify='end'>
                <NavbarItem >
                    {
                        session?.user ? <div>Signed In</div> : <div>Sign Out</div>
                    }
                </NavbarItem>
            </NavbarContent>
        </Navbar>
     )
}

