import { FORM_ERROR } from 'final-form';
import React, { useContext } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { combineValidators, isRequired } from 'revalidate';
import { Form, Button, Label, Header } from 'semantic-ui-react';
import TextInput from '../../App/common/form/TextInput';
import { IUserFormValues } from '../../App/models/user';
import { RootStoreContext } from '../../App/stores/rootStore';
import ErrorMessage from '../../App/common/form/ErrorMessage'

// Revalidate package for checking user has filled required form fields
const validate = combineValidators({
    email: isRequired('Email'),
    password: isRequired('Password')
  });

const LoginForm = () => {
    
    const rootStore = useContext(RootStoreContext);
    const { login } = rootStore.userStore;

    return (
        <FinalForm
            onSubmit={(values: IUserFormValues) =>
                login(values).catch(error => ({
                [FORM_ERROR]: error
                }))
            }
            validate={validate}
            render={({ handleSubmit, submitting, submitError, invalid, pristine, dirtySinceLastSubmit }) => (
                <Form onSubmit={handleSubmit} error>
                <Header as='h2' content='Login to Pinga' color='teal' textAlign='center' />
                <Field name='email' component={TextInput} placeholder='Email' />
                <Field
                    name='password'
                    component={TextInput}
                    placeholder='Password'
                    type='password'
                />
                {submitError && !dirtySinceLastSubmit && (
                    <ErrorMessage error={submitError} text='Invalid email or password' />
                )}
                
                <Button  disabled={(invalid && !dirtySinceLastSubmit) || pristine} loading={submitting} color='teal' content='Login' fluid />
                </Form>
            )}
        />
    );
};

export default LoginForm;