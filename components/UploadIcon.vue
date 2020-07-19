<template>
  <v-form>
    <v-file-input
      v-model="inputImage"
      accept="image/*"
      show-size
      label="画像ファイルをアップロードしてください"
      prepend-icon="mdi-image"
      @change="upload"
    />
    <v-img :src="$store.getters['auth/getIconUrl']" />
  </v-form>
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
      maxSize: 10000000, // 10MB
      validationError: ''
    }
  },
  methods: {
    upload (file) {
      // バリデート
      if (this.validation(file)) {
          this.$swal({
              icon: 'error',
              title: this.validationError,
          })

          return
      }
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
    },
    validation (file) {
        // 1. アップロードされるファイルが画像であること
        if (!(file.type.includes('image'))) {
            this.validationError = '画像ファイルのみアップロード可能です'
            return true
        }
        // 2. 画像のサイズが10MB未満であること
        if (!(parseInt(file.size) < this.maxSize)) {
            this.validationError = this.maxSize + 'byte未満のファイルのみアップロード可能です'
            return true
        }
        return false
    }
  }
}
</script>