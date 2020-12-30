import React, { Fragment, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Item, Label } from 'semantic-ui-react'

import VisitStore from '../../../App/stores/visitStore'
import VisitListItem from './VisitListItem'


const VisitList: React.FC = () => {
    
    const visitStore = useContext(VisitStore)
    const {visitsByDate, deleteVisit, submitting, target} = visitStore

    return (
        <Fragment>
            {visitsByDate.map(([group, visits]) => (
                <Fragment key={group} >
                    <Label size='large' color='blue' >
                        {group}
                    </Label>        
   
                    <Item.Group divided>
                        {visits.map(visit => (
                            <VisitListItem key={visit.id} visit={visit} />
                        ))}
                    </Item.Group>

                </Fragment>
            ))}
        </Fragment>
    )
}

export default observer(VisitList)
