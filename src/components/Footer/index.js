import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Progress } from 'antd'
import { PauseOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import find from 'assets/images/find.png'
import blog from 'assets/images/blog.png'
import mine from 'assets/images/mine.png'
import kalaok from 'assets/images/kalaok.png'
import yuncun from 'assets/images/yuncun.png'

const footerList = [
    {
        path: '/admin/find',
        icon: find,
        activeIcon: '',
        text: '发现'
    },
    {
        path: '/admin/blog',
        icon: blog,
        activeIcon: '',
        text: '播客'
    },
    {
        path: '/mine',
        icon: mine,
        activeIcon: '',
        text: '我的'
    },
    {
        path: '/kalaok',
        icon: kalaok,
        activeIcon: '',
        text: 'k歌'
    },
    {
        path: '/yuncun',
        icon: yuncun,
        activeIcon: '',
        text: '云村'
    }
]

const MiniPlayer = styled.div`
    padding: 8px 12px;
    background-color: rgb(251, 251, 251);
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    & > .author-list {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        b {
            font-weight: 600;
            color: #606266;
            font-size: 14px;
        }
        span {
            font-size: 12px;
            color: #c0c4cc;
            -webkit-transform: scale(0.9);
        }
        span.offset {
            margin: 0 4px;
        }
        img {
            width: 32px;
            border-radius: 4px;
            border: 1px solid #e4e7ed;
            margin-right: 9px;
        }
    }
    & > .author-btn {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        /* color: '#606266'; */
        & > * {
            cursor: pointer;
        }
    }
`
const StyleFooter = styled.footer`
    width: 100%;
    z-index: 1000;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    & > .link-path {
        height: 72px;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-around;
        a {
            height: 100%;
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            justify-content: center;
            color: rgb(180, 180, 180);
            img {
                width: 24px;
                margin-bottom: 6px;
            }
            span {
                font-size: 10px;
                -webkit-transform: scale(0.8);
            }
        }
    }
`
export default function Footer() {
    const [playProgress, setplayProgress] = useState(0)
    // const progress = useRef(playProgress)
    const memo = useCallback(() => setplayProgress(p => p + 1), [playProgress])
    useEffect(() => {
        const timer = setInterval(() => {
            setplayProgress(p => p + 1)
            // console.log(playProgress)
        }, 1000)
        return () => clearInterval(timer)
    }, [])
    // console.log(playProgress)
    return (
        <StyleFooter>
            <MiniPlayer>
                <div className="author-list">
                    <img
                        src="http://p3.music.126.net/Hc9w_YFltA5UygznazIP-w==/109951166329788060.jpg?param=34y34"
                        alt=""
                    />
                    <b>Stitches</b>
                    <span className="offset">-</span>
                    <span>shawn Mendes</span>
                </div>
                <div className="author-btn">
                    <Progress
                        style={{ marginRight: 16 }}
                        type="circle"
                        percent={playProgress}
                        width={28}
                        format={percent => <PauseOutlined style={{ color: '#000' }} />}
                        strokeColor="#c0c4cc"
                        strokeLinecap="#dcdfe6"
                    />
                    <MenuUnfoldOutlined />
                </div>
            </MiniPlayer>
            <div className="link-path">
                {footerList.map((item, index) => (
                    <Link key={index} to={item.path}>
                        <img src={item.icon} alt={item.text} />
                        <span>{item.text}</span>
                    </Link>
                ))}
            </div>
        </StyleFooter>
    )
}
