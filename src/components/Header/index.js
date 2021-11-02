import { MenuOutlined, AliwangwangFilled, SearchOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const StyleHeader = styled.header`
    width: 100%;
    height: 64px;
    padding: 0 18px;
    box-sizing: border-box;
    z-index: 1000;
    position: fixed;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(to bottom, rgb(242, 241, 242), rgb(239, 235, 235));
    & span.anticon {
        font-size: 18px;
        font-weight: 500;
        color: #000;
    }
`
const StyleInputSearch = styled.div`
    margin: 0 16px;
    flex: auto;
    height: 36px;
    box-sizing: border-box;
    border-radius: 18px;
    background-color: rgb(253, 253, 253);
    color: #909399;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    & span.anticon {
        font-size: 16px;
        color: rgb(190, 196, 192);
    }
    & span.placeholder-text {
        font-size: 14px;
        color: rgb(196, 196, 196);
        margin-left: 6px;
    }
`
export default function Header() {
    return (
        <StyleHeader>
            <MenuOutlined />
            <StyleInputSearch>
                <SearchOutlined />
                <span className="placeholder-text">lovely - Billie Eilish</span>
            </StyleInputSearch>
            <AliwangwangFilled />
            {/* <SoundOutlined /> */}
        </StyleHeader>
    )
}
