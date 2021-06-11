import React, { useState } from 'react';
import Logo from '../../logo.svg';
import { Link } from 'react-router-dom';
import {
   Collapse,
   Navbar,
   NavbarToggler,
   NavbarBrand,
   Nav,
   NavItem,
   NavLink,
   Container,
} from 'reactstrap';

const Example = (props) => {
   const [isOpen, setIsOpen] = useState(false);

   const toggle = () => setIsOpen(!isOpen);

   return (
      <Navbar color='dark' dark expand='md'>
         <Container fluid={true}>
            <NavbarBrand href='/'>
               <img
                  src={Logo}
                  width='30'
                  height='30'
                  className='d-inline-block align-top'
                  alt='React Bootstrap logo'
               />
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
               <Nav className='mr-auto' navbar>
                  <NavItem>
                     <NavLink tag={Link} to='/login'>
                        Login
                     </NavLink>
                  </NavItem>
                  <NavItem>
                     <NavLink tag={Link} to='/login'>
                        Register
                     </NavLink>
                  </NavItem>
                  <NavItem>
                     <NavLink href='/register'>Register</NavLink>
                  </NavItem>
               </Nav>
            </Collapse>
         </Container>
      </Navbar>
   );
};

export default Example;
