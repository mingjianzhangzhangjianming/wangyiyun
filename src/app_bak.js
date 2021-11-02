import { Input } from 'antd'
import styled, { keyframes, ThemeProvider } from 'styled-components'
import './index.css'
const Container = styled.div`
    width: 1200px;
    height: 'auto';
    margin: 120px auto;
`

// const Button = styled.button`
//     background: transparent;
//     border-radius: 3px;
//     border: 2px solid palevioletred;
//     color: palevioletred;
//     margin: 0.5em 1em;
//     padding: 0.25em 1em;
//     cursor: pointer;
//     /* ${props =>
//         props.primary &&
//         css`
//             color: deeppink;
//             border: none;
//         `}
//     ${props => console.log(props)} */
// `

// const Button = styled.button`
//     display: inline-block;
//     font-size: 1em;
//     margin: 1em;
//     padding: 0.25em 1em;
//     border-radius: 3px;
//     color: ${props => props.them.main};
//     border: 2px solid ${props => props.them.main};
//     :hover {
//         background: deeppink;
//     }
// `
// Button.defaultProps = {
//     them: {
//         main: '#000'
//     }
// }

// const them = {
//     main: 'deeppink'
// }

// Define our button, but with the use of props.theme this time
const Button = styled.button`
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border-radius: 3px;

    /* Color the border and text with theme.main */
    color: ${props => props.theme.main};
    border: 2px solid ${props => props.theme.main};
`

// We are passing a default theme for Buttons that arent wrapped in the ThemeProvider
Button.defaultProps = {
    theme: {
        main: 'palevioletred'
    }
}

// Define what props.theme will look like
const theme = {
    main: 'mediumseagreen'
}

const Link = ({ className, children }) => <a className={className}>{children}</a>

const StyledLink = styled(Link)`
    :hover {
        background: deeppink;
    }
    ::before {
        content: '🤭';
    }
    ::after {
        content: '©';
    }
    font-size: 24px;
    font-weight: 450;
    color: pink;
    background-color: transparent;
    .some-class > & {
        background: tomato;
    }
    /* & + & {
        background: #000;
    } */
    .thmer {
        font-size: 36px;
        font-weight: 500;
    }
`
// const TomatoButton = styled(Button)`
//     background-color: tomato;
//     color: #e7e7e7;
//     ${props => console.log(props)}
// `

const inputRotate = keyframes`
    0%{
        transform: rotate(0deg);
    }
    100%{
        transform: rotate(180deg);
    }
`
const StyleWrap = styled.input.attrs({
    type: 'password'
})`
    width: 500px;
    height: 64px;
    background-color: deeppink;
    font-size: ${props => (props.size ? props.size * 3 + 'px' : '5rem')};
    animation: ${inputRotate} 0.8s linear 5;
`
export default function App() {
    return (
        <Container>
            <header className="App-header">
                {/* <Button primary>56454</Button>
                <TomatoButton primary>tomato btn</TomatoButton> */}
                <StyleWrap className="class1" size={6} />
                {/* <Button>Normal</Button>
                <ThemeProvider theme={them}>
                    <Button> Button</Button>
                </ThemeProvider> */}

                <div>
                    <Button>Normal</Button>
                    <ThemeProvider theme={theme}>
                        <Button>Themed</Button>
                        <Button theme={{ main: '#000' }}>Themed</Button>
                    </ThemeProvider>
                </div>
                <Input />
                <Link>home</Link>
                <br />
                <StyledLink>page one</StyledLink>
                <StyledLink className="demo">
                    <div className="thmer">
                        page one <span className="thmer">thmer</span>
                    </div>
                </StyledLink>
                <div className="some-class">
                    <StyledLink>page two</StyledLink>
                </div>
                <p id="title">
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </a>
            </header>
        </Container>
    )
}
