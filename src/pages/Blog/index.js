import { Component, useCallback, useState, useRef, useEffect } from 'react'
import { Button } from 'antd'
import { useToggle, useHover, useVirtualList } from 'ahooks'

// export default class Blog extends Component {
//     constructor(props) {
//         super(props)
//         console.log('constructor')
//         this.state = {
//             count: 0
//         }
//     }

//     static getDerivedStateFromProps() {
//         console.log('getDerivedStateFromProps')
//     }

const debounce = (fn, deay) => {
    let timer
    return function () {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments)
        }, deay)
    }
}

const throttle1 = (fn, deay) => {
    let timer
    return function () {
        if (!timer) {
            fn.apply(this, arguments)
            timer = setTimeout(() => {
                timer = null
            }, deay)
        } else {
            console.log('上一个定时器还未执行！')
        }
    }
}

//     throttle2 = (fn, deay) => {
//         let lastTime = 0
//         return function () {
//             if (new Date().getTime() >= lastTime + deay) {
//                 fn.apply(this, arguments)
//                 lastTime = new Date().getTime() + deay
//             } else {
//                 console.log('上一个定时器还未执行！')
//             }
//         }
//     }

//     myConsole = text => console.log(text, 'debounce')

//     handleClick = this.debounce((text, e) => {
//         this.setState(({ count }) => ({ count: count + 1 }))
//         console.log(this.state.count, 'state', text, e)
//     }, 2000)
//     handleClick1 = this.debounce(this.myConsole, 2000)

//     resize = this.throttle2(e => console.log(e), 2000)

//     componentDidMount() {
//         console.log('componentDidMount')
//         window.addEventListener('resize', this.resize)
//     }

//     componentWillUnmount() {
//         window.removeEventListener('resize', this.resize)
//     }

//     render() {
//         return (
//             <div>
//                 <button onClick={e => this.handleClick('测试debounce', e)}>{this.state.count}</button>
//             </div>
//         )
//     }
// }

// function useDebounce(fn, deay) {
//     console.log('debounce>>>>>>>>>')
//     return debounce(fn, deay)
// }
// const Blog = () => {
//     const [state, setState] = useState(0)
//     const handleClick = useDebounce(() => setState(s => s + 1), 500)
//     const handleClick1 = useDebounce(e => console.log(e.target.value), 500)
//     return (
//         <div>
//             <input onChange={handleClick1} />
//             <button onClick={handleClick}>{state}</button>
//         </div>
//     )
// }

// const Blog = () => {
//     const [num, setNum] = useState(0)
//     console.log('render blog')
//     const handleClick = useDebounce(() => {
//         setNum(c => c + 1)
//         console.log('debounce')
//     }, 1000)
//     // const handleOnChange = e => {
//     //     console.log(e.target.value)
//     //     setNum(e.target.value)
//     // }
//     // const handleSearch = useCallback(
//     //     debounce(e => handleOnChange(e), 5000),
//     //     []
//     // )
//     return (
//         <>
//             <Button onClick={() => handleClick()}>{num}</Button>
//             {/* <input value={num} onChange={handleSearch} placeholder="Basic usage" /> */}
//         </>
//     )
// }

const Demo = () => {
    const [state, { toggle }] = useToggle(false)
    return (
        <div>
            <span>{JSON.stringify(state)}</span>
            <Button onClick={() => toggle()}>toggle</Button>
        </div>
    )
}

export default function () {
    // const [counter1, setCounter1] = useState(0)
    // const [counter2, setCounter2] = useState(0)
    // console.log('render')
    // const handleClick = useCallback(
    //     useDebounce(function () {
    //         console.count('click1')
    //         setCounter1(counter1 + 1)
    //     }, 500),
    //     []
    // )

    // useEffect(function () {
    //     const t = setInterval(() => {
    //         setCounter2(x => x + 1)
    //     }, 500)
    //     return clearInterval.bind(undefined, t)
    // }, [])

    return (
        <div style={{ padding: 30 }}>
            <Demo8 />
            {/* <Button onClick={() => handleClick()}>click</Button> */}
            {/* <div>{counter1}</div>
            <div>{counter2}</div> */}
        </div>
    )
}

// export default Blog

const Demo8 = () => {
    const { list, containerProps, wrapperProps } = useVirtualList(Array.from(Array(99999).keys()), {
        overscan: 30,
        itemHeight: 60
    })
    console.log(containerProps, wrapperProps)
    return (
        <>
            <div {...containerProps} style={{ height: '300px', overflow: 'auto' }}>
                <div {...wrapperProps}>
                    {list.map(ele => (
                        <div
                            style={{
                                height: 52,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '1px solid #e8e8e8',
                                marginBottom: 8
                            }}
                            key={ele.index}
                        >
                            Row: {ele.data}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
