<template>
  <div>
    <v-card
      :tile="$vuetify.breakpoint.sm || $vuetify.breakpoint.xs"
      class="mx-auto fill-width"
      max-width="400"
    >
      <v-card-title class="text-center pa-8">
        <h4 class="fill-width">プロフィールを入力</h4>
      </v-card-title>
      <v-divider> </v-divider>
      <div class="px-6 py-8">
        <div style="max-width:344px" class="mx-auto">
            <v-row justify="center">
              <v-avatar
                size="125"
              >
              <v-img
                v-if="uploadedImage"
                :src="uploadedImage"
              />
              <img 
                v-else
                src="~/static/default_user.png"
              />
              </v-avatar>
            </v-row>
            <v-form>
              <v-file-input
                type="file"
                label="タップしてアイコンを選択"
                @change="onFileChange"
              />
            </v-form>
          <div>
            <v-text-field
              v-model="displayName"
              :rules="[required]"
              autofocus
              dense
              height="48px"
              outlined
              placeholder="ユーザー名"
            />
          </div>
          <div class="login-btn pb-8">
            <v-btn
              class="fill-width"
              color="#FFCB00"
              depressed
              height="48px"
              tile
              :disabled="!displayName"
              @click="updateUserInfo"
            >
              登録
            </v-btn>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  data() {
    return {
      displayName: '',
      uploadedImage: '',
      uploadedFile: '',
      required: value => !!value || "ユーザー名は必須です"
    }
  },
  methods: {
    onFileChange(e) {
      console.log(e)
      if (e) {
        this.createImage(e);
        this.uploadedFile = e
      } else {
        this.uploadedImage = ''
      }
    },
    // アップロードした画像を表示
    createImage(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.uploadedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    updateUserInfo() {
      const file = this.uploadedFile
      const uid = this.$store.getters['auth/getUserId']
      this.$store.dispatch('auth/updateDisplayName', {
        uid: uid,
        displayName: this.displayName,       
      })
      if (file) {
        const storageRef = firebase.storage().ref('user/' + uid + '/image.jpg')
        // 画像をStorageにアップロード
        storageRef.put(file).then(() => {
          // アップロードした画像のURLを取得
          firebase.storage().ref('user/' + uid + '/image.jpg').getDownloadURL().then((url) => {
              // アップロードした画像のURLと画像名をDBに保存
              this.$store.dispatch('auth/updatePhotoUrl', {
                uid: uid, photoUrl: url
              })
          }).catch((error) => {
              console.log('エラー', error)
          })
        })
      } else {
        this.$store.dispatch('auth/updatePhotoUrl', {
          uid: uid,
          photoUrl: 'https://firebasestorage.googleapis.com/v0/b/cloud-critic.appspot.com/o/user%2Fdefault_icon%2Fdefault_user.png?alt=media&token=62ee1e9a-ee6b-475f-b0af-3e845ff9f885'
        })
      }
      Promise.resolve()
      .then(this.$router.push('/'))
      .then(this.reload())
    },
  }
}
</script>

<style scoped>
.fill-width {
  width: 100%;
}
</style>