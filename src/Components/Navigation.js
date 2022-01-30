import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
// export default function MyNav() {
//     // <Navbar bg="dark">
//     // </Navbar>
//     <Button>test</Button>
// }

const Navigation = () => {
    return (
        <Navbar bg="light">
            <Nav>
                <Nav.Link href="home">Home</Nav.Link>
                <Nav.Link href="login">Login</Nav.Link>
                <Nav.Link href="register">Register</Nav.Link>

            </Nav>
        </Navbar>
    )
}

export default Navigation;