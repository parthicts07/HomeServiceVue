<!-- <template>
    <div class="container">
      <h2>Professional Profile</h2>
      <div v-if="profile">
        <p><strong>Username:</strong> {{ profile.username }}</p>
        <p><strong>Email:</strong> {{ profile.email }}</p>
        <p><strong>Phone:</strong> {{ profile.phone }}</p>
        <p><strong>Name:</strong> {{ profile.name }}</p>
        <p><strong>Bio:</strong> {{ profile.bio }}</p>
        <p><strong>Experience Years:</strong> {{ profile.experience_years }}</p>
        <p><strong>Skills:</strong> {{ profile.skills }}</p>
        <p><strong>Service:</strong> {{ profile.service }}</p>
        <p><strong>Nationality:</strong> {{ profile.nationality }}</p>
        <p><strong>Aadhar Card:</strong> {{ profile.aadhar_card }}</p>
        <div class="profile-picture-container">
          <img :src="profile.profile_pic_url || '../../assets/uploads/dummy.jpg'" alt="Profile Picture" class="profile-picture">
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
        errorMessage: ''
      };
    },
    async created() {
      try {
        const response = await fetch('http://127.0.0.1:5000/professionals/viewProfile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('profToken')}`
          }
        });
  
        const data = await response.json();
  
        if (data.success) {
          this.profile = data.profile;
          console.log(this.profile);
        } else {
          this.errorMessage = data.message || 'Failed to load profile.';
        }
      } catch (error) {
        console.error('Error:', error);
        this.errorMessage = 'An error occurred while loading the profile.';
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
</style> -->

<template>
  <div class="container mt-4">
    <h2>Professional Profile</h2>
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
        <p><strong>Phone:</strong> {{ profile.phone }}</p>
        <p><strong>Bio:</strong> {{ profile.bio }}</p>
        <p><strong>Experience Years:</strong> {{ profile.experience_years }}</p>
        <p><strong>Skills:</strong> {{ profile.skills }}</p>
        <p><strong>Service:</strong> {{ profile.service }}</p>
        <p><strong>Nationality:</strong> {{ profile.nationality }}</p>
        <p><strong>Aadhar Card:</strong> {{ profile.aadhar_card }}</p>
        <button class="btn btn-primary" @click="isEditing = true">Edit Profile</button>
        <button class="btn btn-secondary" @click="isChangingPassword = true">Change Password</button>
      </div>
      <div v-else-if="isEditing">
        <h3>Edit Profile</h3>
        <input type="text" v-model="editProfileData.name" class="form-control" placeholder="Name">
        <input type="email" v-model="editProfileData.email" class="form-control mt-2" title="You can't change Email" readonly>
        <input type="text" v-model="editProfileData.phone" class="form-control mt-2" placeholder="Phone">
        <input type="text" v-model="editProfileData.bio" class="form-control mt-2" placeholder="Bio">
        <input type="text" v-model="editProfileData.experience_years" class="form-control mt-2" placeholder="Experience Years">
        <input type="text" v-model="editProfileData.skills" class="form-control mt-2" placeholder="Skills">
        <input type="text" v-model="editProfileData.service" class="form-control mt-2" placeholder="Service">
        <input type="text" v-model="editProfileData.nationality" class="form-control mt-2" placeholder="Nationality">
        <input type="text" v-model="editProfileData.aadhar_card" class="form-control mt-2" placeholder="Aadhar Card">
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
        bio: '',
        experience_years: '',
        skills: '',
        service: '',
        nationality: '',
        aadhar_card: ''
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
        const token = localStorage.getItem('profToken');
        const response = await fetch('http://localhost:5000/professionals/viewProfile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.success) {
          this.profile = data.profile;
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
        const token = localStorage.getItem('profToken');
        const response = await fetch('http://localhost:5000/professionals/editProfile', {
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
        const token = localStorage.getItem('profToken');
        const response = await fetch('http://localhost:5000/professionals/changePassword', {
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
        const token = localStorage.getItem('profToken');
        const formData = new FormData();
        formData.append('file', this.profilePicture);
        const response = await fetch('http://localhost:5000/professionals/profile/update_picture', {
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
}

.edit-icon {
  cursor: pointer;
}
</style>