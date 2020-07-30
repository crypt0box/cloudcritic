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
              @click="test"
            >
              <img
                class="button-logo-img mr-4"
                src="~/static/account-box.png"
                style="height:24px;"
              />
              テストユーザーでログイン
            </v-btn>
            <v-btn
              class="fill-width mt-5 text-capitalize"
              height="48px"
              outlined
              style="border-color:#979797;"
              tile
            >
              <img
                class="button-logo-img mr-4"
                src="https://madeby.google.com/static/images/google_g_logo.svg"
                style="height:24px;"
              />
              Googleでログイン
            </v-btn>
          </div>
          <div class="separator separator_login_page">
            <div class="middle_separator">または</div>
          </div>
          <div class="pt-6">
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
                :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                :type="passwordShow ? 'text' : 'password'"
                dense
                height="48px"
                name="input-password"
                outlined
                placeholder="パスワード"
                @click:append="passwordShow = !passwordShow"
              ></v-text-field>
            </div>
            <div class="login-btn pb-8">
              <v-btn
                class="fill-width caption"
                color="#FFCB00"
                depressed
                height="48px"
                tile
              >
                会員登録
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
    }
  },
  methods: {
    // ** テストユーザーとしてログイン
    test() {
      this.$store.dispatch('auth/login', {
        email: "test@test.com",
        password: "TestM@n314159",
      }),
      this.$router.push('/')
    },
    // ** Google認証を行うときに呼び出される関数
    google() {
      // ** ② Google認証
      const auth = () => {
        return new Promise((resolve, reject) => {
          const authUI = new firebase.auth.GoogleAuthProvider();
          console.log("auth");
          // This gives you a the Google OAuth 1.0 Access Token and Secret.
          firebase
            .auth()
            .signInWithPopup(authUI)
            .then(result => {
              resolve(result);
            })
            .catch(error => {
              // Handle Errors here.
              reject(error);
            });
        });
      };

      // ** ③ 認証後のユーザー情報を取得してオブジェクト化
      const getAccountData = result => {
        return new Promise((resolve, reject) => {
          let userObject = {};
          let user = result.user;
          userObject.token = result.credential.accessToken;
          userObject.refreshToken = user.refreshToken;
          userObject.uid = user.uid;
          userObject.displayName = user.displayName;
          userObject.photoURL = user.photoURL;
          userObject.email = user.email;
          userObject.isNewUser = result.additionalUserInfo.isNewUser;
          userObject.providerId = result.additionalUserInfo.providerId;
          resolve(userObject);
        });
      };

      // ** 同期的に順番に処理を実行する
      Promise.resolve()
        .then(this.setPersistence)
        .then(auth)
        .then(getAccountData)
        .then(userObject => this.createPhotoURL(userObject))
        .then(userObject => this.setPublicUserData(userObject))
        .then(userObject => this.setPrivateUserData(userObject))
        .then(userObject => this.setLocalUserData(userObject))
        .catch(error => this.onRejectted(error));
    },
    // ** ① 認証状態を明示的にセットする
    setPersistence() {
      return new Promise((resolve, reject) => {
        firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
          .then(result => {
            resolve();
          });
      });
    },
    // ** ④ Googleから取得したアイコンのURLをFirestorageに登録して、そのURLをFirestoreに登録する準備
    createPhotoURL(userObject) {
      return new Promise((resolve, reject) => {
        // ** TODO - 初めてじゃない場合は処理しない対応が必要
        let url = userObject.photoURL;
        let xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = function(event) {
          let blob = xhr.response;
          let storageRef = storage.ref();
          let mountainsRef = storageRef.child(
            `user/${userObject.uid}/image.jpg`
          );
          let uploadTask = mountainsRef.put(blob);
          uploadTask.then(snapshot => {
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              console.log(downloadURL);
              // ** firestorageに登録したURLを登録するオブジェクトに代入
              userObject.photoURL = downloadURL;
              resolve(userObject);
            });
          });
        };
        xhr.open("GET", url);
        xhr.onerror = function(e) {
          // クロスドメインでひっかかる場合はstorageに登録しない
          console.log("ooooooops!!cros!!");
          resolve(userObject);
        };
        xhr.send();
      });
    },
    // ** ⑤ 公開可能なユーザー情報をFirestoreに登録
    setPublicUserData(userObject) {
      return new Promise((resolve, reject) => {
        let publicUser = firestore.collection("users").doc(userObject.uid);
        publicUser
          .set(this.createPublicObj(userObject), { merge: true })
          .then(result => {
            resolve(userObject);
          });
      });
    },
    createPublicObj(obj) {
      let publicObj = {};
      publicObj.uid = obj.uid;
      publicObj.providerId = obj.providerId;
      publicObj.isNewUser = obj.isNewUser;
      if (obj.isNewUser) {
        publicObj.photoURL = obj.photoURL;
        publicObj.displayName = obj.displayName;
      }
      if (
        (obj.providerId.indexOf("twitter") != -1 ||
          obj.providerId.indexOf("github") != -1) &&
        obj.isNewUser
      ) {
        // ** プロフィールが存在して、isNewUserがtrueじゃないときにオブジェクトに代入する
        publicObj.profile = obj.profile;
        publicObj.screenName = obj.screenName;
      }
      return publicObj;
    },
    // ** ⑥ 非公開のユーザー情報をFirestoreに登録
    setPrivateUserData(userObject) {
      return new Promise((resolve, reject) => {
        let privateUsers = firestore
          .collection("privateUsers")
          .doc(userObject.uid);
        privateUsers
          .set(this.createPrivateObj(userObject), { merge: true })
          .then(result => {
            resolve(userObject);
          });
      });
    },
    createPrivateObj(obj) {
      let privateObj = {};
      privateObj.uid = obj.uid;
      privateObj.providerId = obj.providerId;
      privateObj.isNewUser = obj.isNewUser;
      privateObj.email = obj.email;
      privateObj.token = obj.token;
      privateObj.refreshToken = obj.refreshToken;
      return privateObj;
    },
    // ** ⑦ ローカルストレージに保持するユーザー情報を設定
    setLocalUserData(userObject) {
      return new Promise((resolve, reject) => {
        let user = firestore.collection("users").doc(userObject.uid);
        user
          .get()
          .then(doc => {
            if (doc.exists) {
              localStorage.setItem("photoURL", doc.data().photoURL);
              localStorage.setItem("uid", userObject.uid);
              localStorage.setItem("token", userObject.token);
              localStorage.setItem("displayName", doc.data().displayName);
              console.log('ログインに成功しました');
              location.reload();
              resolve(userObject);
            }
          })
          .catch(error => {
            console.log("Error getting document:", error);
          });
      });
    },
    // ** エラー処理
    onRejectted(error) {
      console.log('ログインに失敗しました');
      console.log("onRejectted", error);
    },
  }
};
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