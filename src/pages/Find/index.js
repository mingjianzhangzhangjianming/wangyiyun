import {
    Component,
    createContext,
    memo,
    forwardRef,
    useState,
    useReducer,
    useEffect,
    useContext,
    useCallback,
    useMemo,
    useRef,
    useImperativeHandle,
    useLayoutEffect
} from 'react'

const config = {
    theme: 'light'
}

const ConfigContext = createContext(config)
const Find = () => {
    const [count, setCount] = useState(0)
    useEffect(() => {
        console.log('render')
        return () => {
            console.log('componentWillUnmount')
        }
    }, [count])
    return (
        <div>
            <button onClick={() => setCount(c => c + 1)}>{count}</button>
            <h1>find</h1>
            <ConfigContext.Provider value={config}>
                <Child1>
                    <ConfigContext.Provider value={{ theme: 'red' }}>
                        <Child2 />
                        <ChildClass />
                    </ConfigContext.Provider>
                </Child1>
            </ConfigContext.Provider>
        </div>
    )
}

const Child1 = props => {
    const { theme } = useContext(ConfigContext)
    console.log(theme)
    return (
        <div>
            <h1>child 1</h1>
            <span>{theme}</span>
            {props.children}
        </div>
    )
}

const Child2 = () => {
    return (
        <div>
            <h1>child 2</h1>
            <ConfigContext.Consumer>{a => console.log(a)}</ConfigContext.Consumer>
            <span>{}</span>
        </div>
    )
}

class ChildClass extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.context)
        return null
    }
}

ChildClass.contextType = ConfigContext

const initState = {
    count: 100,
    list: []
}

const ADD = 'ADD'
const _ADD = '_ADD'
const PUSH = 'PUSH'
const reducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case ADD:
            return { ...state, count: state.count + 1 }
        case _ADD:
            return { ...state, count: state.count - 1 }
        case PUSH:
            return { ...state, list: [...state.list, action.value] }
        default:
            return { ...state }
    }
}

const ReducerChild = memo(
    ({ renderFn }) => {
        console.log('子组件由于没使用React.memo 与 useCallback 重新渲染啦')
        return (
            <div>
                {renderFn().map((item, index) => (
                    <p key={index}>{index}</p>
                ))}
            </div>
        )
    }
    //可选参数 props浅比较来决定是否渲染包裹组件 如渲染则返回false 反之则返回true 与shouldComponentUpdata相反
    // ,
    // (prevProps, nextProps) => {
    //     console.log(prevProps, nextProps)
    //     return true
    // }
)
const ReducerA = () => {
    const inputRef = useRef(null)
    const $inputRef = useRef(null)
    const [state, dispatch] = useReducer(reducer, initState)
    console.log('Reducer组件渲染啦！')
    const getDataList = useCallback(() => new Array(8).fill(0), [state.count])
    const date1 = useMemo(() => `${+new Date()}`, [state.count])
    useEffect(() => {
        inputRef.current.focus()
        $inputRef.current.setNum(inputRef.current.value)
        console.log(inputRef.current.value, '>>>>', $inputRef)
    }, [state.count])
    return (
        <div>
            <BoxUseEffect />
            <BoxUseLayoutEffect />
            <span>{state.count}</span>
            <h2>{state.list.join('--')}</h2>
            <h1>{date1}</h1>
            <input ref={inputRef} />
            <button onClick={() => dispatch({ type: ADD })}>+</button>
            <button onClick={() => dispatch({ type: _ADD })}>-</button>
            <button onClick={() => dispatch({ type: PUSH, value: state.count })}>save</button>
            <span>--------------------------------子组件--------------------------------</span>
            <ReducerChild renderFn={getDataList} />
            <ReducerRef ref={$inputRef} />
        </div>
    )
}

const boxStyle = {
    width: 120,
    height: 120,
    border: '1px solid #000',
    marginTop: 36
}
const BoxUseEffect = () => {
    useEffect(() => {
        console.log('effect --->')
    }, [])
    useLayoutEffect(() => {
        console.log('Layout -- effect --->')
    }, [])
    return (
        <div style={boxStyle} children={'useEffect'}>
            <button></button>
        </div>
    )
}

const BoxUseLayoutEffect = () => {
    return <div style={boxStyle} children={'useLayoutEffect'} />
}

const ReducerRef = forwardRef((props, ref) => {
    const [num, setNum] = useState(0)
    useImperativeHandle(ref, () => ({
        num,
        setNum
    }))
    return (
        <div>
            <h2>这是forwardRef 子组件</h2>
            <input value={num} onChange={e => setNum(e.target.value)} />
        </div>
    )
})
const WrapFind = Com => {
    const [isMount, SetIsMount] = useState(false)
    return (
        <div>
            {isMount ? '已销户Find组件' : <Find />}
            <hr />
            <button onClick={() => SetIsMount(c => !c)}>销毁组件</button>
            <ReducerA />
        </div>
    )
}
export default WrapFind
