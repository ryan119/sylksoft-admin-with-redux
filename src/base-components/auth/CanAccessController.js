import { forEach } from 'lodash'
import { element } from 'prop-types'
import React, { Children, cloneElement } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
const CanAccessController = (props) => {
    const { children, resource, ...prop } = props
    const menu = useSelector((state) => state.member.get('menu')?.toJS(), shallowEqual)
    const permissions = getActions(menu, resource)
    //console.log('permissions:', permissions)
    const getChildren = () => {
        return Children.map(children, (child, idx) => {
            return cloneElement(child, {
                ...{
                    key: idx,
                    permissions:permissions,
                    ...prop,
                    ...child.props,
                }
            })
        })
    }

    return (
        <div id={props?.id} className='flex'>
            { getChildren() }
        </div>
    )
}

export default CanAccessController


function getActions(tree, current) {

    let targetFunction
    let layer = -1
    let found = false

    const findCurrentFunctions = (func, layer) => {
        if (func.url === current) {
            targetFunction = func
        }

        if (func.children?.length > 0) {
            func.children.map(e => {
                if (e.children?.length > 0) {
                    findCurrentFunctions(e, layer)
                }
            })
        }
    }

    forEach(tree, t => {
        findCurrentFunctions(t, layer)
    })

    let functions = {}
    if (targetFunction) {

        const getActions = (children) => {
            //functions.push({ resource: children.id, name: children.name, url: children.url })
            functions[children.id] = {name: children.name, url: children.url }
            if (children.children.length > 0) {
                children.children.map((s) => {
                    getActions(s)
                })
            }
        }
        getActions(targetFunction)
    }

    return functions
}
