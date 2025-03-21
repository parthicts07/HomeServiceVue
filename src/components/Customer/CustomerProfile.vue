<template>
  <div class="container mt-4">
    <h2>Customer Profile</h2>
    <div v-if="profile">
      <div class="profile-picture-container" @mouseover="showEditPhoto = true" @mouseleave="showEditPhoto = false">
        <img :src="profile.profile_pic_url || '../../assets/uploads/dummy.jpg'" alt="Profile Picture" class="profile-picture">
        <div v-if="showEditPhoto" class="edit-photo-overlay">
          <i class="fas fa-edit edit-icon" style="color:#fff" @click="isEditingPhoto = true"></i>
        </div>
      </div>
      <div v-if="!isEditing && !isChangingPassword && !isEditingPhoto">
        <p><strong>Name:</strong> {{ profile.name }}</p>
        <p><strong>Email:</strong> {{ profile.email }}</p>
        <p><strong>Address:</strong> {{ profile.address }}</p>
        <p><strong>City:</strong> {{ profile.city }}</p>
        <p><strong>State:</strong> {{ profile.state }}</p>
        <p><strong>Zip Code:</strong> {{ profile.zipcode }}</p>
        <p><strong>Mobile Number:</strong> {{ profile.phone }}</p>
        <button class="btn btn-primary" @click="isEditing = true">Edit Profile</button>
        <button class="btn btn-secondary" @click="isChangingPassword = true">Change Password</button>
      </div>
      <div v-else-if="isEditing">
        <h3>Edit Profile</h3>
        <input type="text" v-model="editProfileData.name" class="form-control" placeholder="Name">
        <input type="email" v-model="editProfileData.email" class="form-control mt-2" title="You can't change Email" readonly>
        <input type="text" v-model="editProfileData.phone" class="form-control mt-2" placeholder="Mobile Number">
        <input type="text" v-model="editProfileData.address" class="form-control mt-2" placeholder="Address">
        <input type="text" v-model="editProfileData.city" class="form-control mt-2" placeholder="City">
        <input type="text" v-model="editProfileData.state" class="form-control mt-2" placeholder="State">
        <input type="text" v-model="editProfileData.zipcode" class="form-control mt-2" placeholder="Zip Code">
        <button class="btn btn-primary mt-2" @click="editProfile">Save Changes</button>
        <button class="btn btn-secondary mt-2" @click="isEditing = false">Cancel</button>
      </div>
      <div v-else-if="isChangingPassword">
        <h3>Change Password</h3>
        <input type="password" v-model="changePasswordData.oldPassword" class="form-control" placeholder="Old Password">
        <input type="password" v-model="changePasswordData.newPassword" class="form-control mt-2" placeholder="New Password">
        <input type="password" v-model="changePasswordData.confirmNewPassword" class="form-control mt-2" placeholder="Confirm New Password">
        <button class="btn btn-primary mt-2" @click="changePassword">Change Password</button>
        <button class="btn btn-secondary mt-2" @click="isChangingPassword = false">Cancel</button>
      </div>
      <div v-else-if="isEditingPhoto">
        <h3>Update Profile Picture</h3>
        <input type="file" @change="onFileChange" accept=".jpg, .jpeg, .png" class="form-control">
        <button class="btn btn-primary mt-2" @click="updateProfilePicture">Upload</button>
        <button class="btn btn-secondary mt-2" @click="isEditingPhoto = false">Cancel</button>
      </div>
    </div>
    <div v-else>
      <p>Loading profile...</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      profile: null,
      isEditing: false,
      isChangingPassword: false,
      isEditingPhoto: false,
      showEditPhoto: false,
      editProfileData: {
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipcode: ''
      },
      changePasswordData: {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      },
      profilePicture: null
    };
  },
  async created() {
    this.fetchProfile();
  },
  methods: {
    async fetchProfile() {
      try {
        const token = localStorage.getItem('custToken');
        const response = await fetch('http://localhost:5000/customers/viewProfile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.success) {
          this.profile = data.profile;
          console.log(this.profile.profile_pic_url);
          this.editProfileData = { ...data.profile };
        } else {
          alert('Failed to load profile');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        alert('An error occurred while fetching the profile.');
      }
    },
    async editProfile() {
      try {
        const token = localStorage.getItem('custToken');
        const response = await fetch('http://localhost:5000/customers/editProfile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(this.editProfileData)
        });
        const data = await response.json();
        if (data.success) {
          alert('Profile updated successfully');
          this.fetchProfile();
          this.isEditing = false;
        } else {
          alert('Failed to update profile');
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('An error occurred while updating the profile.');
      }
    },
    async changePassword() {
      if (this.changePasswordData.newPassword !== this.changePasswordData.confirmNewPassword) {
        alert('New password and confirm password do not match');
        return;
      }
      try {
        const token = localStorage.getItem('custToken');
        const response = await fetch('http://localhost:5000/customers/changePassword', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(this.changePasswordData)
        });
        const data = await response.json();
        if (response.ok) {
          alert('Password changed successfully');
          this.isChangingPassword = false;
        } else {
          alert(data.message || 'Failed to change password');
        }
      } catch (error) {
        console.error('Error changing password:', error);
        alert('An error occurred while changing the password.');
      }
    },
    onFileChange(event) {
      this.profilePicture = event.target.files[0];
    },
    async updateProfilePicture() {
      if (!this.profilePicture) {
        alert('Please select a file');
        return;
      }
      try {
        const token = localStorage.getItem('custToken');
        const formData = new FormData();
        formData.append('file', this.profilePicture);
        const response = await fetch('http://localhost:5000/customers/profile/update_picture', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });
        const data = await response.json();
        if (data.success) {
          alert('Profile picture updated successfully');
          this.fetchProfile();
          this.isEditingPhoto = false;
        } else {
          alert('Failed to update profile picture');
        }
      } catch (error) {
        console.error('Error updating profile picture:', error);
        alert('An error occurred while updating the profile picture.');
      }
    }
  }
};
</script>

<style>
.profile-picture-container {
  position: relative;
  width: 150px;
  height: 150px;
}

.profile-picture {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.edit-photo-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s;
}

.profile-picture-container:hover .edit-photo-overlay {
  opacity: 1;
}

.overlay-form {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}
.modal {
  display: none;
  position: fixed;
  z-index: 1050;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  outline: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-dialog {
  position: relative;
  width: auto;
  margin: 10px;
  pointer-events: none;
  max-width: 500px;
  margin: 1.75rem auto;
}
.modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  outline: 0;
}
.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
}
.modal-title {
  margin-bottom: 0;
  line-height: 1.5;
}
.close {
  padding: 0;
  background-color: transparent;
  border: 0;
  /* -webkit-appearance: none; */
}
.modal-body {
  position: relative;
  flex: 1 1 auto;
  padding: 1rem;
}
.modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem;
  border-top: 1px solid #dee2e6;
}
</style>