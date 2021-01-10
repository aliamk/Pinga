import React, {Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Container, Segment, Header, Button, Image } from 'semantic-ui-react';
import { RootStoreContext } from '../../App/stores/rootStore';
import LoginForm from '../user/LoginForm';
import RegisterForm from '../user/RegisterForm';

const HomePage = () => {
  const token = window.localStorage.getItem('jwt');
  const rootStore = useContext(RootStoreContext);
  const { user, isLoggedIn } = rootStore.userStore;
  const {openModal} = rootStore.modalStore;

    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
        <Container text>
          <Header as='h1' inverted>
            <Image
              size='massive'
              src='/assets/heart_logo.png'
              alt='logo'              
              style={{ marginBottom: 12 }}
            />
            Pinga
          </Header>
            {isLoggedIn && user && token ? (
              <Fragment>
                <Header as='h2' inverted content={`Welcome back ${user.displayName}`} />
                <Button as={Link} to='/visits' size='huge' inverted>
                  Go to Visits!
                </Button>
              </Fragment>
            ) : (
              <Fragment>
                <Header as='h2' inverted content={`Welcome to Pinga`} />
                <Button onClick={() => openModal(<LoginForm />)} size='huge' inverted>
                  Login
                </Button>
                <Button onClick={() => openModal(<RegisterForm />)} size='huge' inverted>
                  Register
                </Button>
            </Fragment>
          )}
        </Container>
      </Segment>
    )
}

export default HomePage
