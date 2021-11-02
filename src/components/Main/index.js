import styled from 'styled-components'
import { Carousel, ProgressProps } from 'antd'

const bannerTab = [
    'http://p1.music.126.net/1nMr7NILhNVsUomxqmuEQQ==/109951166465256673.jpg?imageView&amp;quality=89',
    'http://p1.music.126.net/LWYDD1eL2EcIQS1u4FMGlw==/109951166464650290.jpg?imageView&quality=89',
    'http://p1.music.126.net/HQo3ghsOVO-J8UK_mauWTA==/109951166465254680.jpg?imageView&quality=89',
    'http://p1.music.126.net/X_8BcqvjpTYHosxS-yNR-w==/109951166464631739.jpg?imageView&quality=89',
    'http://p1.music.126.net/op1roeO3tDKHjZOz_50cow==/109951166465247850.jpg?imageView&quality=89',
    'http://p1.music.126.net/XQk3yC4D9hR4x_7uSOc5IQ==/109951166464634857.jpg?imageView&quality=89',
    'http://p1.music.126.net/dJF0nP_LW5VxG0NQdM_hEg==/109951166465215569.jpg?imageView&quality=89',
    'http://p1.music.126.net/qlqgDOyRUWhyfrCnqkc5GA==/109951166465248398.jpg?imageView&quality=89'
]
const StyleMain = styled.main`
    width: 100%;
    height: 100vh;
    padding: 64px 0 72px;
    box-sizing: border-box;
    overflow-y: auto;
    position: fixed;
    top: 0;
`
const SwiperContainer = styled.div`
    padding: 16px 0;
    box-sizing: border-box;
    background: linear-gradient(to bottom, rgb(239, 235, 235), #fff);
    .ant-carousel .slick-initialized .slick-slide {
        padding: 0 12px;
    }
    img.d-flag {
        width: 100%;
        border-radius: 8px;
    }
`

export default function Main(props) {
    return (
        <StyleMain>
            <SwiperContainer>
                <Carousel autoplay>
                    {bannerTab.map((src, index) => (
                        <div key={index}>
                            <img className="d-flag" src={src} alt={index} />
                        </div>
                    ))}
                </Carousel>
            </SwiperContainer>
            {props.children}
        </StyleMain>
    )
}
