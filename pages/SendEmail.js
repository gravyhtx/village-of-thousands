import Nodemailer from '../components/Nodemailer';
import { Button } from 'react-materialize';

const SendEmail = () => {
    let html = <><h1>HTML</h1><div><i>This</i> is <b>HTML</b>.</div></>
    const send = () => {
        console.log("click");
        <Nodemailer
        to="andrew@gravydesign.co"
        text="This is the TEXT"
        html={<><h1>THIS</h1><div>Is <b>HTML</b> for ya.</div></>}
        />
        Nodemailer("info", "andrew@gravydesign.co", "Test", "This is TEXT", {html})
    }
    return (
        <Button
            node="button"
            style={{
                marginRight: '5px',
                width: '250px'
            }}
            waves="light"
            className="account-wallet-btn"
            onClick={send}
        >
            SEND EMAIL
        </Button>
    )
}

export default SendEmail;