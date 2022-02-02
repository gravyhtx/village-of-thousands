import { useEffect, useRef, useState } from "react";
import { Button } from "react-materialize";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const Captcha = () => {
    const [token, setToken] = useState(null);
    const captchaRef = useRef(null);
  
    const onLoad = () => {
      // this reaches out to the hCaptcha JS API and runs the
      // execute function on it. you can use other functions as
      // documented here:
      // https://docs.hcaptcha.com/configuration#jsapi
      captchaRef.current.execute();
    };
  
    useEffect(() => {
  
      if (token)
        console.log(`hCaptcha Token: ${token}`);
        localStorage.setItem('hCaptcha_token', token);
    }, [token]);
  
    return (
      <form>
        <HCaptcha
          sitekey={process.env.REACT_APP_HCAPTCHA_SITE_KEY}
          onLoad={onLoad}
          onVerify={setToken}
          ref={captchaRef}
          theme={"dark"}
        />
      </form>
    );
}

export default Captcha;