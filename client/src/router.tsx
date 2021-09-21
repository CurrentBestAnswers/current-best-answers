import React from 'react'
import { Route, Switch } from 'react-router-dom'

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
        <Route path="/" component={React.lazy(() => import('./pages/graphs'))} exact />
        <Route path="/graphs/add" component={React.lazy(() => import('./pages/graphs/add'))} />
        <Route path="/:pid" component={React.lazy(() => import('./pages/[pid]'))} />
        <Route path="*" component={React.lazy(() => import('./pages/404'))} />
      </Switch>
    )
  }
}

export default RouterComp
