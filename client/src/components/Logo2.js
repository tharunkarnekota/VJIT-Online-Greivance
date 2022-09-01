import React from 'react'
import vjit from "./vjit.png"

import { Navbar, Container } from 'react-bootstrap'
import "./Logo.css"

const Logo = () => {
    return (
        <div >
            <Navbar >
                <Container>
                <Navbar.Brand href="https://vjit.ac.in" target="_blank"><img src={vjit}  width="30%" height="89%" alt="vjit" /></Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                    {/* <img className="headerclub" src={clubs} width="60%" height="60%" alt="clubs" /> */}
                    </Navbar.Text>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Logo
