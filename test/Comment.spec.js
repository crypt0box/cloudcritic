import { mount } from '@vue/test-utils'
import Comment from '../components/Comment.vue'

describe('Comment', () => {
  test('コンポーネントが存在する', () => {
    // Commentコンポーネントをマウントする
    const wrapper = mount(Comment)
    // expect()の中身がtrueだったらテスト合格
    expect(wrapper.exists()).toBeTruthy()
  })
})