import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Grid } from 'semantic-ui-react'
import { RouteComponentProps } from 'react-router-dom'

import LoadingComponent from '../../../App/layout/LoadingComponent'
import VisitDetailedHeader from './VisitDetailedHeader'
import VisitDetailedInfo from './VisitDetailedInfo'
import VisitDetailedSidebar from './VisitDetailedSidebar'
import VisitDetailedChat from './VisitDetailedChat'
import { RootStoreContext } from '../../../App/stores/rootStore'


// Need the interface to set typeface of ID for match.params.id
interface DetailParams {
  id: string
}

const VisitDetails: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {

  const rootStore = useContext(RootStoreContext)
  const { visit, loadVisit, loadingInitial } = rootStore.visitStore

  useEffect(() => {
    loadVisit(match.params.id)
  }, [loadVisit, match.params.id, history])

  if (loadingInitial) return <LoadingComponent content='Loading visit...' />

  if (!visit) return <h1>Visit Not Found</h1>

  return (
        <Grid>
          <Grid.Column width={10}>
            <VisitDetailedHeader visit={visit} />
            <VisitDetailedInfo visit={visit} />
            <VisitDetailedChat />
          </Grid.Column>
          <Grid.Column width={6}>
            <VisitDetailedSidebar attendees={visit.attendees}/>
          </Grid.Column>
        </Grid>
    )
}

export default observer(VisitDetails)
