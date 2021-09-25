import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Custom404 from './pages/404'
import Graphs from './pages/graphs'
import Add from './pages/graphs/add'
import Questions from './pages/graphs/questions'

class RouterComp extends React.Component<{}, { hasError: boolean }> {
  static getDerivedStateFromError() {
    return { hasError: true }
  }

  constructor(props) {
    super(props)

    this.state = { hasError: false }
  }

  componentDidCatch() {
    setTimeout(() => {
      this.setState({ hasError: false })
    }, 2000)
  }

  render() {
    if (this.state.hasError) return <div>Working...</div>

    return (
      <Switch>
        <Route path="/" component={Graphs} exact />
        <Route path="/graphs/add" component={Add} />
        <Route path="/graphs/questions" component={Questions} />
        <Route path="*" component={Custom404} />
      </Switch>
    )
  }
}

export default RouterComp
