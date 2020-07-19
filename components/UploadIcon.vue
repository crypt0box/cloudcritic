<template>
  <div>
  <v-form>
    <v-file-input
      type="file"
      v-model="inputImage"
      accept="image/*"
      label="画像ファイルをアップロードしてください"
      prepend-icon="mdi-image"
      :clearable="false"
      @change="upload"
    />
  </v-form>
    <v-card 
      v-if="$store.getters['auth/getIconUrl']"
      max-width="300"
    >
      <v-avatar
        class="ma-3"
        size="125"
        tile
      >
      <v-img :src="$store.getters['auth/getIconUrl']" />
      </v-avatar>
      <v-card-text>
        {{ $store.getters['auth/getIconName'] }}
        <v-btn icon>
          <v-icon @click="deleteIcon">mdi-close</v-icon>
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  name: 'UploadIcon',
  data() {
    return {
      id: this.$route.params.id,
      inputImage: null,
      iconUrl: '',
    }
  },
  methods: {
    upload (file) {
      if (file) {
        const storageRef = firebase.storage().ref('users/' + this.id + '/images/' + file.name)
        // 画像をStorageにアップロード
        storageRef.put(file).then(() => {
          // アップロードした画像のURLを取得
          firebase.storage().ref('users/' + this.id + '/images/' + file.name).getDownloadURL().then((url) => {
              // アップロードした画像のURLと画像名をDBに保存
              this.$store.dispatch('auth/uploadIcon', { uid: this.id, iconName: file.name, iconUrl: url })
          }).catch((error) => {
              console.log(error)
          })
        })
      }
    },
    deleteIcon() {
      const desertRef = firebase.storage().ref().child('users/' + this.id + '/images/' + this.$store.getters['auth/getIconName'])
      // Firestore Storageに保存されている画像削除
      desertRef.delete().then(() => {
          console.log('success!')
      }).catch((error) => {
          console.log(error)
      })
      this.$store.dispatch('auth/deleteIcon', this.id)
      this.inputImage = ''
    },
  }
}
</script>