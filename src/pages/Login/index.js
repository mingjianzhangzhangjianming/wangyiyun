import React, { useEffect, useState, useRef } from 'react'
import Mock from 'mockjs'
import { useSize, useBoolean, useFullscreen, useVirtualList, useEventListener, useReactive, useRequest } from 'ahooks'
import styled from 'styled-components'
import { Button, Input, Divider } from 'antd'

const Login = styled.div`
    transform: translateY(160px);
    margin: 0 auto;
    width: 80%;
    min-width: 600px;
    /* display: flex; */
    /* align-items: center; */
    /* justify-content: center; */
`
const useScroll = (ref, fn) => {
    const [position, setPosition] = useState({ left: 0, top: 0 })
    useEffect(() => {
        const shouldUpdate = val => val.top > 20 && val.top < 100
        const target = ref?.current || ref
        console.log(target)
        const onScroll = e => {
            const { scrollTop: top, scrollLeft: left } = e.target
            console.log(shouldUpdate({ left, top }))
            setPosition({ left, top })
        }
        target.addEventListener('scroll', onScroll)
        return () => target.removeEventListener('scroll', onScroll)
    }, [ref])
    return position
}

//虚拟滚动

class VirtualList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            start: 0
        }
        this.ref = React.createRef(null)
        this.scrollRef = React.createRef(null)
    }

    onScroll = e => {
        const { scrollTop } = e.target
        console.log(scrollTop)
        const start = Math.ceil(scrollTop / this.props.itemHeight)
        this.setState({ start })
        this.ref.current.style.transform = `translateY(${scrollTop - Math.ceil(scrollTop % this.props.itemHeight)}px)`
    }
    onscrollTo = start => {
        this.setState({ start })
        const scrollTop = start * this.props.itemHeight
        this.scrollRef.current.scrollTop = scrollTop
        this.ref.current.style.transform = `translateY(${scrollTop - Math.ceil(scrollTop % this.props.itemHeight)}px)`
    }
    componentDidMount() {
        this.target = this.scrollRef.current
        this.target.addEventListener('scroll', this.onScroll)
    }

    componentWillUnmount() {
        this.target.removeEventListener('scroll', this.onScroll)
    }
    render() {
        const { list, renderCount, bufferCount, render, itemHeight } = this.props
        let { start } = this.state
        const len = list.length
        start = start >= len - renderCount ? len - renderCount - 1 : start
        let end = start + renderCount + bufferCount
        const renderList = list.slice(start, end)
        console.log(renderList)
        return (
            <div style={{ overflowY: 'hidden', height: renderCount * itemHeight }}>
                <div style={{ overflow: 'auto', height: '100%' }} ref={this.scrollRef}>
                    <div style={{ height: (list.length - end) * itemHeight }} ref={this.ref}>
                        {renderList.map(render)}
                    </div>
                </div>
            </div>
        )
    }
}

export default () => {
    const ref = useRef(null)
    const list = new Array(1000).fill(0).map((_, i) => i)
    const [state, { toggle }] = useBoolean()
    const setScroll = start => {}
    const userList = [
        {
            id: '001',
            username: 'A'
        },
        {
            id: '002',
            username: 'B'
        },
        {
            id: '003',
            username: 'C'
        }
    ]
    const getUserId = () => {
        return new Promise(resolve => {
            setTimeout(() => resolve(Mock.mock('@id')), 500)
        })
    }
    const getUsername = () => {
        return new Promise(resolve => {
            setTimeout(() => resolve(Mock.mock('@name')), 500)
        })
    }

    const getEmail = async () => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(Mock.mock({ 'data|5': ['@email'] }).data)
            }, 300)
        })
    }
    const {
        data: userId,
        run: runId,
        loading: loadingId
    } = useRequest(getUserId, {
        // manual: true
        loadingDelay: 600
    })
    const { run, data, cancel, loading, fetches } = useRequest(getUsername, {
        manual: true,
        // pollingInterval: 1000,
        // pollingWhenHidden: false,
        ready: !!userId,
        fetchKey: id => id,
        onSuccess: (result, parmas) => {
            console.log('success', result)
        }
    })
    useEffect(() => {
        console.log(fetches)
    }, [fetches])

    const { data: emails, run: sendEmail } = useRequest(getEmail, {
        // debounceInterval: 500,
        throttleInterval: 500,
        manual: true
    })

    const handleChange = e => {
        console.log(e.target.value)
        sendEmail(e.target.value)
    }

    const getArticle = async () => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    data: Mock.mock('@paragraph'),
                    time: new Date().getTime()
                })
            }, 1000)
        })
    }
    const [val, setVal] = useState('')
    const { data: name1, mutate } = useRequest(getUsername, {
        onSuccess: reslut => setVal(reslut)
    })
    const Article = () => {
        const { data, loading } = useRequest(getArticle, {
            refreshOnWindowFocus: true,
            focusTimespan: 100,
            cacheKey: 'article'
        })
        console.log(data, loading)
        return (
            <>
                {!data?.data && loading ? (
                    <h1>loading...</h1>
                ) : (
                    <>
                        <p>Latest request time: {data?.time}</p>
                        <p>{data?.data}</p>
                    </>
                )}
            </>
        )
    }
    const setMutate = () => {
        mutate(val)
    }
    return (
        <Login>
            <span>name:{name1}</span>
            <Input value={val} onChange={e => setVal(e.target.value)} placeholder="请输入..." />
            <Button type="link" onClick={setMutate}>
                submit
            </Button>
            <Divider dashed children={'突变'} />
            {/* <VirtualList
                ref={ref}
                list={list}
                renderCount={12}
                bufferCount={6}
                itemHeight={52}
                render={(item, index) => (
                    <p
                        style={{
                            width: 320,
                            height: index % 2 ? 24 : 58,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #e8e8e8',
                            marginBottom: 8
                        }}
                        key={index}
                    >
                        {item}
                    </p>
                )}
            /> */}
            <h2>
                {loading ? 'loading' : data}
                <span>id: {loadingId ? 'loading...' : userId}</span>
                <Button onClick={() => runId()}>延迟loading 防止闪烁</Button>
                <pre>{JSON.stringify(fetches, null, 2)}</pre>
            </h2>
            <div>
                {userList.map(item => (
                    <Button type="dashed" key={item.id} onClick={() => run(item.id)}>
                        {item.username}
                    </Button>
                ))}
                <Button disabled={loading} onClick={() => run()}>
                    resquse
                </Button>
                <Button onClick={() => cancel()}>cancel</Button>
                <Input style={{ width: 240 }} onChange={handleChange} />
                <ul>
                    {emails?.map(email => (
                        <li key={email}>{email}</li>
                    ))}
                </ul>
                <Divider />
                <Button onClick={() => toggle()}>hidden / show</Button>
                {state && <Article />}
            </div>
        </Login>
    )
}
