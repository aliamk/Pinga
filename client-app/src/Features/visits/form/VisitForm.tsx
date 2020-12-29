import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Form, Segment, Button } from 'semantic-ui-react'
import { IVisit } from '../../../App/models/visit_interface'
import {v4 as uuid} from 'uuid'
import { RouteComponentProps } from 'react-router-dom'

import VisitStore from '../../../App/stores/visitStore'


// Need the interface to set typeface of ID for match.params.id
interface DetailParams {
    id: string
  }

const VisitForm:React.FC<RouteComponentProps<DetailParams>> = ({ match }) => {

    const visitStore = useContext(VisitStore)
    const {createVisit, editVisit, submitting, cancelFormOpen, visit: initialFormState, loadVisit, clearVisit} = visitStore
    const [ visit, setVisit ] = useState<IVisit>({
        id: '',
        title: '',
        description: '',
        date: '',
        location: ''
    })

    useEffect(() => {
        if (match.params.id && visit.id.length === 0) {
            loadVisit(match.params.id).then(() => initialFormState && setVisit(initialFormState))
        }
        return () => {
            clearVisit()
        }
    }, [loadVisit, clearVisit, match.params.id, initialFormState, visit.id.length])


    const handleSubmit = () => {
        if (visit.id.length === 0) {
            let newVisit = {
                ...visit,
                id: uuid()
            }
            createVisit(newVisit)
        } else {
            editVisit(visit)
        }
    }

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.currentTarget
        setVisit({ ...visit, [name]: value})
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input onChange={handleInputChange} name='title' placeholder='Title' value={visit.title} />
                <Form.TextArea onChange={handleInputChange} name='description' rows={2} placeholder='Description'  value={visit.description} />
                <Form.Input onChange={handleInputChange} name='date' type='datetime-local' placeholder='Date'  value={visit.date}/>
                <Form.Input onChange={handleInputChange} name='location' placeholder='Location' value={visit.location} />
                <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
                <Button onClick={cancelFormOpen} floated='right' type='button' content='Cancel' />
            </Form>            
        </Segment>
    )
}

export default observer(VisitForm)
