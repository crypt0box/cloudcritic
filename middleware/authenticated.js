export default function ({ store, redirect }) {
  // ユーザーが認証されていないとき
  if (!store.state.auth.status) {
    return redirect('/login')
  }
}