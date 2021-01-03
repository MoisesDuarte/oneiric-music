<template>
  <b-container class="mt-4">
    <!-- Add Music Form -->
    <transition name="fade">
      <b-card v-if="addState" title="Add Music">
        <b-card-text>
          <b-form @submit.prevent="addNewMusic">
            <b-form-group label="Title">
              <b-form-input 
                v-model="musicDetails.title" 
                required
              />
            </b-form-group>
            <b-form-group label="Artist">
              <b-form-input 
                v-model="musicDetails.artist" 
                required
              />
            </b-form-group>
            <b-form-group label="Music">
              <b-form-file 
                v-model="musicDetails.music" 
                accept="audio/wav, audio/mp3" 
                required
              />
            </b-form-group>
            <b-button variant="danger" @click="clearForm">
              Clear
            </b-button>
            <b-button variant="primary" type="submit">
              Submit
            </b-button>
          </b-form>
        </b-card-text>
      </b-card>
    </transition>

    <!-- Music Listing -->
    <b-card class="my-4">
      <b-button variant="primary" @click="addState = !addState">
        {{ addState ? "Cancel" : "Add New Music" }}
      </b-button>
      <b-table :items="musics" :fields="fields" :busy="musicLoading" fixed borderless striped show-empty>
        <template #cell(actions)="row">
          <b-button variant="danger" @click="deleteMusic(row.item._id)">
            Delete
          </b-button>
        </template>
      </b-table>
    </b-card>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      musicLoading: false,
      musics: [],
      fields: [
        { key: 'title', label: 'Title', },
        { key: 'artist', label: 'Artist' },
        { key: 'created', label: 'Date Created' },
        { key: 'actions', label: 'Actions'},
      ],
      addState: false,
      addLoading: false,
      musicDetails: {
        title: null,
        artist: null,
        music: null,
      },
    };
  },
  methods: {
    async getAllMusics() {
      this.musicLoading = true;
      try {
        const res = await this.$axios.get('/music');
        this.musics = res.data;
        this.musicLoading = false;
      } catch (err) {
        this.musicLoading = false;
        swal('Error', 'Cannot fetch music files', 'error');
      }
    },
    addNewMusic() {
      let formData = new FormData();
      formData.append('title', this.musicDetails.title);
      formData.append('artist', this.musicDetails.artist);
      formData.append('music', this.musicDetails.music);

      this.addLoading = true;

      this.$axios.post('/music', formData)
      .then((res) => {
        console.log(res);
        this.addLoading = false;
        this.clearForm();
        this.getAllMusics();
        swal('Success', 'New music added', 'success');
      })
      .catch((err) => {
        this.addLoading = false;
        swal('Error', 'Something went wrong', 'error');
        console.log(err);
      });
    },
    deleteMusic(id) {
      swal({
        title: 'Are you sure?',
        text: 'Once deleted, this music cannot be recovered anymore!',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then(willDelete => {
        if (willDelete) {
          this.$axios.delete(`/music/${id}`)
          .then((res) => {
            this.getAllMusics();
            swal('Your music file has been deleted!', {
              icon: 'success',
            });
          })
          .catch(err => {
            swal('Error', 'Something went wrong', 'error')
            console.info(err);
          });
        }
      });
    },
    clearForm() {
      this.musicDetails.title = null;
      this.musicDetails.artist = null;
      this.musicDetails.music = null;
    },
  },
  created() {
    this.getAllMusics();
  },
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>