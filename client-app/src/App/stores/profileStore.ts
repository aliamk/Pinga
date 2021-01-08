import { RootStore } from './rootStore';
import { observable, action, runInAction, computed } from 'mobx';
import { IPhoto, IProfile } from '../models/profile';
import agent from '../api/agent';
import { toast } from 'react-toastify';


export default class ProfileStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
      this.rootStore = rootStore;
    }

  @observable profile: IProfile | null = null;
  @observable loadingProfile = true;            // loadProfile
  @observable uploadingPhoto = false;           // uploadPhoto
  @observable loading = false;                  // setMainPhoto



  @computed get isCurrentUser() {
    if (this.rootStore.userStore.user && this.profile) {
      // if these two values match, return true
      return this.rootStore.userStore.user.username === this.profile.username;
    } else {
      return false;
    }
  }

  @action loadProfile = async (username: string) => {
    this.loadingProfile = true;
    try {
      const profile = await agent.Profiles.get(username);
      runInAction(() => {
        this.profile = profile;
        this.loadingProfile = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingProfile = false;
      });
      console.log(error);
    }
  }

  // Method for uploading an image
  @action uploadPhoto = async (file: Blob) => {
    this.uploadingPhoto = true;
    try {
      const photo = await agent.Profiles.uploadPhoto(file);
      runInAction(() => {
        if (this.profile) {                                         // if profile exists push it to photos
          this.profile.photos.push(photo);
          if (photo.isMain && this.rootStore.userStore.user) {      // if photo isMain and user exists in the userStore
            this.rootStore.userStore.user.image = photo.url;
            this.profile.image = photo.url;
          }
        }
        this.uploadingPhoto = false;
      });
    } catch (error) {
      console.log(error);
      toast.error('Problem uploading photo');
      runInAction(() => {
        this.uploadingPhoto = false;
      });
    }
  };

  @action setMainPhoto = async (photo: IPhoto) => {
    this.loading = true;
    try {
      await agent.Profiles.setMainPhoto(photo.id);
      runInAction(() => {
        this.rootStore.userStore.user!.image = photo.url;                   // update userStore's user object
        this.profile!.photos.find(v => v.isMain)!.isMain = false;           // remove old main photo in profile's photo array
        this.profile!.photos.find(v => v.id === photo.id)!.isMain = true;   // add new main photo in profile's photo array
        this.profile!.image = photo.url;                                    // update profile image with new the main photo
        this.loading = false;
      });
    } catch (error) {
      toast.error('Problem setting photo as main');
      runInAction(() => {
        this.loading = false;
      });
    }
  };



} // End ProfileStore

