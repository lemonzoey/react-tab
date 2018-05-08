import React from 'react'
import { Layout, Menu,Tabs } from 'antd';
import { BrowserRouter as Router,Route,Link} from 'react-router-dom'
import './css/layout.css'
import Option1 from './components/option1'
import Option2 from './components/option2'
import Option3 from './components/option3'
var createHistory = require('history').createBrowserHistory
const history = createHistory() 
const TabPane = Tabs.TabPane
const { Header, Content, Sider } = Layout;
class Layout1 extends React.Component{
    constructor(props){
        super(props)
        this.newTabIndex = 0
        const panes = []
        const menuPanes=[
          { title:"tab1", content: Option1, key: "1",router:"/option1",nav:'option1'},
          { title:"tab2", content: Option2, key: "2",router:"/option2",nav:'option2'},
          { title:"tab3", content: Option3, key: "3",router:"/option3",nav:'option3'}
        ]
        const selectedKey=""
        this.state = {
          activeKey: panes.length==0 ? '1':panes[0].key,
          panes,
          menuPanes,
          selectedKey
        }
    }
    handleClick(pane){
        let panes = this.state.panes
        let activeKey=pane.key
        let flag=true

        debugger
        panes.length > 0 && panes.map((item,i)=>{
           if(item.key == activeKey){
                flag = false
           } 
        })
        if(!panes||panes.length===0||flag){
            panes.push(pane)
        }
        let selectedKey=activeKey
        this.setState({ panes, activeKey,selectedKey })
    }  
    onChange = (activeKey) => {
      const panes = this.state.panes
      let router
      panes.map((item,i)=>{
        if(activeKey === item.key){
          router = item.router
          return false
        }
      })
      history.push(router)  
      let selectedKey=activeKey
      this.setState({selectedKey ,activeKey })
    }  
    onEdit = (targetKey, action) => {
      this[action](targetKey)
    }
    add = () => {
      const panes = this.state.panes
      const activeKey = `newTab${this.newTabIndex++}`
      panes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey })
      this.setState({ panes, activeKey })
    }
    remove = (targetKey) => {
      debugger
      let activeKey = this.state.activeKey
      let lastIndex
      this.state.panes.forEach((pane, i) => {
        if (pane.key == targetKey) {
          lastIndex = i - 1
        }
      })
      const panes = this.state.panes.filter(pane => pane.key != targetKey);
      if (lastIndex >= 0 && activeKey === targetKey) {
        activeKey = panes[lastIndex].key
      }
      this.setState({ panes, activeKey })
    }
    
    render(){
        return <Layout>
        <Header className="header">
          <div className="logo" />
          <p style={{color:'white'}}>我是顶部通栏</p>
        </Header>
        <Router>
            <Layout>
            <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                theme="dark" 
                mode="inline"
                defaultSelectedKeys={['1']}
                selectedKeys={[this.state.selectedKey]}
                style={{ height: '100%', borderRight: 0 }}
                >
                  { 
                    this.state.menuPanes.map(item=>{
                    return <Menu.Item key={item.key}><Link to={item.router} onClick={()=>this.handleClick(item)}>{item.nav}</Link></Menu.Item>
                    })
                  }
                </Menu>
            </Sider>
            <Layout style={{ padding: '0 24px 24px',margin: '0 0 10px', minHeight: 600  }} >
                <Tabs
                    onChange={this.onChange.bind(this)}
                    activeKey={this.state.activeKey}
                    type="editable-card"
                    onEdit={this.onEdit}
                >
                {
                    this.state.panes && this.state.panes.map(pane => {
                    let Component = pane.content
                    return <TabPane tab={pane.title} key={pane.key}  closable={pane.closable}>
                             <Component />
                           </TabPane>})
                  }
                </Tabs>
            </Layout>
            </Layout>
        </Router>
      </Layout>
    }
}
export default Layout1