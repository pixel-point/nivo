/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { useState, useContext, useCallback } from 'react'
import { tooltipContext } from './context'

export const useTooltipHandlers = container => {
    const [state, setState] = useState({
        isVisible: false,
        content: null,
        position: {}, // the coords are absolute
    })

    const showTooltipAt = useCallback((content, [x, y], anchor) => {
        const bounds = container.current.getBoundingClientRect()

        setState({
            isVisible: true,
            position: [bounds.left + x, bounds.top + y],
            anchor,
            content,
        })
    }, [])

    const showTooltipFromEvent = useCallback(
        (content, event, anchor) => {
            setState({
                isVisible: true,
                position: [event.clientX, event.clientY],
                anchor,
                content,
            })
        },
        [container]
    )

    const hideTooltip = useCallback(() => {
        setState({ isVisible: false, content: null })
    })

    return {
        showTooltipAt,
        showTooltipFromEvent,
        hideTooltip,
        isTooltipVisible: state.isVisible,
        tooltipPosition: state.position,
        tooltipAnchor: state.anchor,
        tooltipContent: state.content,
    }
}

export const useTooltip = () => useContext(tooltipContext)
