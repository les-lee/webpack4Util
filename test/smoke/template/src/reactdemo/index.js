import React from 'react'
import ReactDOM from 'react-dom'
import './reactdemo.styl'

// eslint-disable-next-line no-unused-vars
class Demo extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return <div className="cssdemo stylusdemo">恭喜发财, 要喊得够豪迈</div>
  }
}

ReactDOM.render(
  <Demo />,
  document.getElementById('root')
)
