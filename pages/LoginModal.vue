<template>
  <button @click="google">
    <span class="icon">
      <i class="fab fa-google"></i>
      &nbsp;
      <span>Google</span>
    </span>
  </button>
</template>

<script>
import firebase from '~/plugins/firebase'
import { firestore, storage } from "~/plugins/firebase"

export default {
  methods: {
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