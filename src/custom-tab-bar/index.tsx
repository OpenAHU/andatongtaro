import { Tabbar } from "@taroify/core"
import { FriendsOutlined, HomeOutlined, Search, SettingOutlined } from "@taroify/icons"

export default function CustomTabBar() {
  return (
    <Tabbar defaultValue='1'>
      <Tabbar.TabItem value='1' icon={<HomeOutlined />}>
        标签
      </Tabbar.TabItem>
      <Tabbar.TabItem value='2' icon={<Search />}>
        标签
      </Tabbar.TabItem>
      <Tabbar.TabItem value='3' icon={<FriendsOutlined />}>
        标签
      </Tabbar.TabItem>
      <Tabbar.TabItem value='4' icon={<SettingOutlined />}>
        标签
      </Tabbar.TabItem>
    </Tabbar>
  )
}

CustomTabBar.options = {
  addGlobalClass: true
}
