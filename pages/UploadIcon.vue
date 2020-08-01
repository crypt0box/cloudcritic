<template>

</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  name: 'UploadIcon',
  data() {
    return {
      uploadedImage: '',
      id: this.$route.params.id,
      inputImage: null,
      iconUrl: '',
    }
  },
  methods: {
    
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