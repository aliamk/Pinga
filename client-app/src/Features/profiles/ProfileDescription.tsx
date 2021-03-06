import React, { useContext, useState } from 'react';
import { Tab, Grid, Header, Button } from 'semantic-ui-react';
import { RootStoreContext } from '../../App/stores/rootStore';
import ProfileEditForm from './ProfileEditForm';
import { observer } from 'mobx-react-lite';
import { IProfile } from '../../App/models/profile';

const ProfileDescription = () => {
  const rootStore = useContext(RootStoreContext);
  const { updateProfile, profile, isCurrentUser } = rootStore.profileStore;
  const [editMode, setEditMode] = useState(false);

// Once UpdateProfile button is pressed, setState to false so the form goes away
const handleEditForm = (profile: Partial<IProfile>) => {
    updateProfile(profile).then(() => setEditMode(false));
    };
    

  return (    
    <Tab.Pane>                      {/* Update the 'panes' array in ProfileContent */}
      <Grid>
        
        <Grid.Column width={16}>
          <Header
            floated='left'
            icon='user'
            content={`About ${profile!.displayName}`}
          />
          {isCurrentUser && (
            <Button
              floated='right'
              basic
              content={editMode ? 'Cancel' : 'Edit Profile'}
              onClick={() => setEditMode(!editMode)}
            />
          )}
        </Grid.Column>

        <Grid.Column width={16}>
          {editMode ? (
            <ProfileEditForm updateProfile={handleEditForm} profile={profile!} />
          ) : (
            <span>{profile!.bio}</span>
          )}
        </Grid.Column>

      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfileDescription);