<template>
  <b-container class="mt-4">
    <b-row>
      <b-col>
        <b-card v-if="allSongs" :title="currentSong.title" :sub-title="currentSong.artist">
          <b-card-text class="pt-2">
            <b-button @click="previousSong">
              Prev
            </b-button>
            <b-button @click="playOrPause">
              {{ isPlaying ? 'Pause' : 'Play' }}
            </b-button>
            <b-button @click="nextSong">
              Next
            </b-button>
          </b-card-text>
        </b-card>
      </b-col>

      <b-col v-if="allSongs">
        <b-card no-body>
          <b-table 
            id="music-table" 
            :items="allSongs" 
            :fields="fields" 
            :per-page="perPage" 
            :current-page="currentPage"
            fixed borderless striped show-empty>
            <template #cell(actions)="row">
              <b-button variant="primary" block @click="playSong(row.item)">
                Play
              </b-button>
            </template>
          </b-table>
          <b-pagination 
            v-model="currentPage"
            :per-page="perPage"
            :total-rows="rows"
            :value="0"
            align="center" pills
            aria-controls="music-table"
          />
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      player: null,
      isPlaying: false,
      allSongs: [],
      currentSong: {
        title: '',
        artist: '',
      },
      currentIndex: 0,
      fields: [
        { key: 'title', label: 'Title', },
        { key: 'artist', label: 'Artist' },
        { key: 'actions', label: 'Actions'},
      ],
      currentPage: 1,
      perPage: 5,
    };
  },
  computed: {
    rows() {
      return this.allSongs.length;
    }
  },
  methods: {
    async initPlayer() {
      // TODO: Change hardcoded port to .env variable
      this.currentSong = this.allSongs[this.currentIndex];  
      this.player.src = `http://localhost:3000/${this.currentSong.music.path}`;   
    },
    async getAllSongs() {
      this.$axios.get('/music')
      .then((res) => {
        this.allSongs = res.data;
        this.initPlayer();
      })
      .catch((err) => {
        console.info('Error on fetch', err);
      });
    },
    playOrPause() {
      if (this.player.paused) {
        console.info(this.player);
        this.player.play();
        this.isPlaying = true;
      } else {
        this.player.pause();
        this.isPlaying = false;
      }
    },
    previousSong() {
      this.currentIndex -= 1;

      if (this.currentIndex < 0) {
        this.currentIndex = this.allSongs.length - 1;
      }

      this.currentSong = this.allSongs[this.currentIndex];
      this.playSong(this.currentSong);
    },
    nextSong() {
      this.currentIndex += 1;

      if (this.currentIndex > this.allSongs.length - 1) {
        this.currentIndex = 0;
      }

      this.currentSong = this.allSongs[this.currentIndex];
      this.playSong(this.currentSong);
    },
    playSong(song) {
      console.info(song);
      const index = this.allSongs.findIndex( i => i._id === song._id );

      this.currentIndex = index;
      this.currentSong = song;
      this.player.src = `http://localhost:3000/${this.currentSong.music.path}`;
      this.player.play();
      this.isPlaying = true;
    }
  },
  created() {
    if (process.client) {
      this.player = new Audio();
    }

    this.getAllSongs();
  },
}
</script>

<style>

</style>