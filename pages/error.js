import Link from "next/link";

import DefaultLayout from "../templates/DefaultLayout";

const Error = () => {
  return (
    <DefaultLayout>
      <div className="error-page">
        <div className="shit-happens">Something happened!</div>
        <div className="fix-that-shit">Go back and fix it or&nbsp;
        <span className="gtfo"><Link href={'/'}><a className="underline-1 link">
          GO HOME
        </a></Link></span>!
        </div>
      </div>
    </DefaultLayout>
  )
};

export default Error;