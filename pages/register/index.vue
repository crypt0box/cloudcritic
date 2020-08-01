<template>
  <div>
    <v-card
      :tile="$vuetify.breakpoint.sm || $vuetify.breakpoint.xs"
      class="mx-auto fill-width"
      max-width="400"
    >
      <v-card-title class="text-center pa-8">
        <h4 class="fill-width">新規登録</h4>
      </v-card-title>
      <v-divider> </v-divider>
      <div class="px-6 py-8">
        <div style="max-width:344px" class="mx-auto">
          <div>
            <v-btn
              class="fill-width text-capitalize"
              height="48px"
              outlined
              style="border-color:#979797;"
              tile
            >
              <img
                class="button-logo-img mr-4"
                src="~/static/account-box.png"
                style="height:24px;"
              />
              テストユーザーでログイン
            </v-btn>
          </div>
          <div class="separator separator_login_page">
            <div class="middle_separator">または</div>
          </div>
          <div>
            <v-text-field
              v-model="email"
              autofocus
              dense
              height="48px"
              outlined
              placeholder="メールアドレス"
            ></v-text-field>

            <v-text-field
              v-model="password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              dense
              height="48px"
              name="input-password"
              outlined
              placeholder="パスワード"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </div>
          <div class="login-btn pb-8">
            <v-btn
              class="fill-width"
              color="#FFCB00"
              depressed
              height="48px"
              tile
              @click="register"
            >
              会員登録をつづける
            </v-btn>
          </div>
          <div class="separator separator_login_page">
            <div class="middle_separator">もしくは</div>
          </div>
          <div class="pt-6">
            <div>
              <v-btn
                class="fill-width mb-5 text-capitalize"
                height="48px"
                outlined
                style="border-color:#979797;"
                tile
                @click="google"
              >
                <img
                  class="button-logo-img mr-4"
                  src="https://madeby.google.com/static/images/google_g_logo.svg"
                  style="height:24px;"
                />
                Googleでログイン
              </v-btn>
              <v-btn
                class="fill-width mb-5 text-capitalize"
                height="48px"
                outlined
                style="border-color:#979797;"
                tile
                @click="twitter"
              >
                <img
                  class="button-logo-img mr-4"
                  src="https://madeby.google.com/static/images/google_g_logo.svg"
                  style="height:24px;"
                />
                Twitterでログイン
              </v-btn>
              <v-btn
                class="fill-width mb-5 text-capitalize"
                height="48px"
                outlined
                style="border-color:#979797;"
                tile
                @click="github"
              >
                <img
                  class="button-logo-img mr-4"
                  src="https://madeby.google.com/static/images/google_g_logo.svg"
                  style="height:24px;"
                />
                githubでログイン
              </v-btn>
            </div>
            <v-divider></v-divider>
            <div class="pt-8 pb-4">
              <span>すでにアカウントをお持ちですか？</span>
              <nuxt-link to="/login">ログインに移動</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
import { firestore, storage } from "~/plugins/firebase"

export default {
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
    }
  },
  methods: {
    // 新規会員登録
    register() {
      // 認証
      const auth = () => {
        return new Promise((resolve, reject) => {
          firebase
            .auth()
            .createUserWithEmailAndPassword(this.email, this.password)
            .then((result) => {
              console.log(result)
              resolve(result)
            })
            .catch((error) => {
              console.log('登録に失敗しました', error)
            })
        })
      }
      // ユーザー情報登録
      const getAccountData = (result) => {
        return new Promise((resolve, reject) => {
          let userObject = {}
          let user = result.user
          userObject.token = 'token'
          userObject.refreshToken = user.refreshToken
          userObject.uid = user.uid
          userObject.displayName = user.displayName
          userObject.photoURL = user.photoURL
          userObject.uid = user.uid
          userObject.email = user.email // null
          userObject.isNewUser = result.additionalUserInfo.isNewUser
          userObject.providerId = result.additionalUserInfo.providerId
          // userObject.profile = result.additionalUserInfo.profile.bio
          // userObject.screenName = result.additionalUserInfo.profile.login
          // ** TODO - firestoreに登録
          resolve(userObject)
        })
      }
      Promise.resolve()
        .then(this.setPersistence)
        .then(auth)
        .then(getAccountData)
        .then((userObject) => this.createPhotoURL(userObject))
        .then((userObject) => this.setPublicUserData(userObject))
        .then((userObject) => this.setPrivateUserData(userObject))
        .then((userObject) => this.setLocalUserData(userObject))
        .catch(this.$router.push('register/RegisterUserInfo'))
    },
    twitter() {
      // 認証
      const auth = () => {
        return new Promise((resolve, reject) => {
          const authUI = new firebase.auth.TwitterAuthProvider()
          // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
          firebase
            .auth()
            .signInWithPopup(authUI)
            .then((result) => {
              resolve(result)
            })
            .catch((error) => {
              // Handle Errors here.
              const errorCode = error.code
              const errorMessage = error.message
              const email = error.email
              const credential = error.credential
              reject(error)
            })
        })
      }
      // ユーザー情報登録
      const getAccountData = (result) => {
        return new Promise((resolve, reject) => {
          // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
          let userObject = {}
          let user = result.additionalUserInfo.profile
          userObject.token = result.credential.accessToken
          userObject.secret = result.credential.secret
          userObject.uid = result.user.uid
          userObject.refreshToken = result.user.refreshToken
          userObject.photoURL = user.profile_image_url_https.replace(
            '_normal',
            '_400x400'
          )
          userObject.displayName = user.name
          userObject.profile = user.description
          userObject.screenName = user.screen_name
          userObject.email = user.email
          userObject.isNewUser = result.additionalUserInfo.isNewUser
          userObject.providerId = result.additionalUserInfo.providerId
          // ** TODO - firestoreに登録
          resolve(userObject)
        })
      }
      Promise.resolve()
        .then(this.setPersistence)
        .then(auth)
        .then(getAccountData)
        .then((userObject) => this.createPhotoURL(userObject))
        .then((userObject) => this.setPublicUserData(userObject))
        .then((userObject) => this.setPrivateUserData(userObject))
        .then((userObject) => this.setLocalUserData(userObject))
        .catch((error) => this.onRejectted(error))
    },
    // ** Google認証を行う関数
    google() {
      // ** ② Google認証
      const auth = () => {
        return new Promise((resolve, reject) => {
          const authUI = new firebase.auth.GoogleAuthProvider()
          // This gives you a the Google OAuth 1.0 Access Token and Secret.
          firebase
            .auth()
            .signInWithPopup(authUI)
            .then((result) => {
              resolve(result)
            })
            .catch((error) => {
              // Handle Errors here.
              const errorCode = error.code
              const errorMessage = error.message
              const email = error.email
              const credential = error.credential
              reject(error)
            })
        })
      }
      // ** ③ 認証後のユーザー情報を取得してオブジェクト化
      const getAccountData = (result) => {
        return new Promise((resolve, reject) => {
          // This gives you a Google Access Token.
          let userObject = {}
          let user = result.user
          userObject.token = result.credential.accessToken
          userObject.refreshToken = user.refreshToken
          userObject.uid = user.uid
          userObject.displayName = user.displayName
          userObject.photoURL = user.photoURL
          userObject.uid = user.uid
          userObject.email = user.email // null
          userObject.isNewUser = result.additionalUserInfo.isNewUser
          userObject.providerId = result.additionalUserInfo.providerId
          // userObject.profile = result.additionalUserInfo.profile.bio // null
          // userObject.screenName = result.additionalUserInfo.profile.login // null
          // ** TODO - firestoreに登録
          resolve(userObject)
        })
      }
      // ** 同期的に順番に処理を実行する
      Promise.resolve()
        .then(this.setPersistence)
        .then(auth)
        .then(getAccountData)
        .then((userObject) => this.createPhotoURL(userObject))
        .then((userObject) => this.setPublicUserData(userObject))
        .then((userObject) => this.setPrivateUserData(userObject))
        .then((userObject) => this.setLocalUserData(userObject))
        .catch((error) => this.onRejectted(error))
    },
    github() {
      const auth = () => {
        return new Promise((resolve, reject) => {
          const authUI = new firebase.auth.GithubAuthProvider()
          // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
          firebase
            .auth()
            .signInWithPopup(authUI)
            .then((result) => {
              resolve(result)
            })
            .catch((error) => {
              // Handle Errors here.
              const errorCode = error.code
              const errorMessage = error.message
              const email = error.email
              const credential = error.credential
              reject(error)
            })
        })
      }
      // ユーザー情報登録
      const getAccountData = (result) => {
        return new Promise((resolve, reject) => {
          // This gives you a GitHub Access Token.
          let userObject = {}
          let user = result.user
          userObject.token = result.credential.accessToken
          userObject.refreshToken = user.refreshToken
          userObject.uid = user.uid
          userObject.displayName = user.displayName
          userObject.photoURL = user.photoURL
          userObject.uid = user.uid
          userObject.email = user.email
          userObject.isNewUser = result.additionalUserInfo.isNewUser
          userObject.providerId = result.additionalUserInfo.providerId
          userObject.profile = result.additionalUserInfo.profile.bio
          userObject.screenName = result.additionalUserInfo.profile.login
          // ** TODO - firestoreに登録
          resolve(userObject)
        })
      }
      Promise.resolve()
        .then(this.setPersistence)
        .then(auth)
        .then(getAccountData)
        .then((userObject) => this.createPhotoURL(userObject))
        .then((userObject) => this.setPublicUserData(userObject))
        .then((userObject) => this.setPrivateUserData(userObject))
        .then((userObject) => this.setLocalUserData(userObject))
        .catch((error) => this.onRejectted(error))
    },
    onRejectted(error) {
      console.log('ログインに失敗しました', error)
      this.isLoginModalActive = false
    },
    createPublicObj(obj) {
      let publicObj = {}
      publicObj.uid = obj.uid
      publicObj.providerId = obj.providerId
      publicObj.isNewUser = obj.isNewUser
      publicObj.photoURL = obj.photoURL
      publicObj.displayName = obj.displayName
      if (obj.isNewUser) {
        publicObj.photoURL = obj.photoURL
        publicObj.displayName = obj.displayName
      }
      if (
        (obj.providerId.indexOf('twitter') != -1 ||
          obj.providerId.indexOf('github') != -1) &&
        obj.isNewUser
      ) {
        // ** プロフィールが存在して、trueじゃないときにオブジェクトに代入する
        publicObj.profile = obj.profile
        publicObj.screenName = obj.screenName
      }
      return publicObj
    },
    createPrivateObj(obj) {
      let privateObj = {}
      privateObj.uid = obj.uid
      privateObj.providerId = obj.providerId
      privateObj.isNewUser = obj.isNewUser
      privateObj.email = obj.email
      privateObj.token = obj.token
      privateObj.refreshToken = obj.refreshToken
      return privateObj
    },
    // ** ① 認証状態を明示的にセットする
    setPersistence() {
      return new Promise((resolve, reject) => {
        firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
          .then((result) => {
            resolve()
          })
      })
    },
    // ** ⑤ 公開可能なユーザー情報をFirestoreに登録
    setPublicUserData(userObject) {
      return new Promise((resolve, reject) => {
        let publicUser = firestore.collection('users').doc(userObject.uid)
        // ** usersに登録するObjのみを登録する
        publicUser
          .set(this.createPublicObj(userObject), { merge: true })
          .then((result) => {
            resolve(userObject)
          })
      })
    },
    // ** ⑥ 非公開のユーザー情報をFirestoreに登録
    setPrivateUserData(userObject) {
      return new Promise((resolve, reject) => {
        let privateUsers = firestore
          .collection('privateUsers')
          .doc(userObject.uid)
        // ** privateUsersに登録するObjのみを登録する
        privateUsers
          .set(this.createPrivateObj(userObject), { merge: true })
          .then((result) => {
            resolve(userObject)
          })
      })
    },
    // ** ⑦ ローカルストレージに保持するユーザー情報を設定
    setLocalUserData(userObject) {
      return new Promise((resolve, reject) => {
        let user = firestore.collection('users').doc(userObject.uid)
        user
          .get()
          .then((doc) => {
            if (doc.exists) {
              localStorage.setItem('photoURL', doc.data().photoURL)
              localStorage.setItem('uid', userObject.uid)
              localStorage.setItem('token', userObject.token)
              localStorage.setItem('displayName', doc.data().displayName)
              console.log('ログインに成功しました')
              this.isLoginModalActive = false
              location.reload()
              resolve(userObject)
            }
          })
          .catch((error) => {
            console.log('Error getting document:', error)
          })
      })
    },
    // ** ④ 取得したアイコンのURLをFirestorageに登録して、そのURLをFirestoreに登録する準備
    createPhotoURL(userObject) {
      return new Promise((resolve, reject) => {
        // This can be downloaded directly:
        let url = userObject.photoURL
        let xhr = new XMLHttpRequest()
        xhr.responseType = 'blob'
        xhr.onload = function(event) {
          let blob = xhr.response
          let storageRef = storage.ref()
          let mountainsRef = storageRef.child(
            `user/${userObject.uid}/image.jpg`
          )
          let uploadTask = mountainsRef.put(blob)
          uploadTask.then((snapshot) => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              console.log(downloadURL)
              // ** firestorageに登録したURLを登録するオブジェクトに代入
              userObject.photoURL = downloadURL
              resolve(userObject)
            })
          })
        }
        xhr.open('GET', url)
        xhr.onerror = function(e) {
          // クロスドメインでひっかかる場合は無視する
          console.log('ooooooops!!cros!!')
          resolve(userObject)
        }
        xhr.send()
      })
    }
  }
}
</script>

<style scoped>
.fill-width {
  width: 100%;
}
.link-caption {
  text-decoration: none;
  color: #666 !important;
  font-size: .75rem;
}
.separator {
  margin-top: 30px;
  margin-bottom: 30px;
  height: 0;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #fff;
  position: relative;
}
.middle_separator {
  position: absolute;
  padding: 0 16px;
  color: #ccc;
  background: #fff;
  font-size: 11px;
  text-shadow: 0 1px 0 #fff;
  text-transform: uppercase;
  top: -7px;
  left: 30%;
}
.middle_separator {
  color: #777;
  font-size: 13px;
  top: -9px;
  left: 41%;
}
</style>