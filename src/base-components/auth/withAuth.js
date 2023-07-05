import { forEach } from 'lodash'
import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import * as _ from 'lodash'

const withAuth = (ChildComponent) => {

    class ComposedComponent extends React.Component {

        render() {
            return <ChildComponent {...this.props}/>
        }
    }

    return ComposedComponent
}

export default withAuth


