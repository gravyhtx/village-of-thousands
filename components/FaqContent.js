import Link from "next/link";
import SocialCircles from "./SocialCircles";

const FaqContent = () => {

  const questions = [
    {
      "question": "Who is the “Village of Thousands”?",
      "answer": [
        <><span className="italics h2"><b>WELCOME TO THE VOT DIGITAL HQ!</b></span></>,
        <><span className="weight-6 special-text">[Village of Thousands]</span> is a Web 3.0 ready lifestyle
        brand, with the aspiration and drive to be among the biggest and best household names in the skateboard
        realm, offering some of the highest quality sustainable apparel and products in the streetwear market.
        Our village is built with the foundation of a true lifestyle brand. We offer an opportunity for all
        who join us on our journey to participate in a community of thousands in both the physical and
        digital space.</>,
        <>The company was founded in 2021 lead by lifelong skateboarder, Juancarlos Villamil, with a passion
        for aesthetics and a commitment to provide high quality, sustainable apparel and products, all
        Grown in the USA. The team is based out of Houston, TX with contributors from around the globe,
        ready to push forward with a dynamic Web 3.0 brand, built to grow for and with our community.</>,
        <>We believe our success relies on the successes we share together as a community. Our constantly
        expanding community of VoT Enthusiasts share in our vision of a <span
        className="italics"><b>sustainable future</b></span> with the <span className="italics"><b>ability
        to sustain.</b></span></>,
        <>We encourage discussion so we thought we'd begin here. And since nobody really frequently
        has been asking us questions quite yet, we thought we’d start it off and use this FAQ to ask
        our community to <span className="italics"><b>"Frequently Ask Questions"</b></span> with us as
        we grow as a brand  and truly discover who we are and what we can be.</>,
        <>Village of Thousands intends to achieve our collective vision through our brand’s platform and
        utilize our diversity, creativity, and passion to participate in a more sustainable future.</>
      ]
    },
    {
      "question": "How does Village of Thousands promote sustainability?",
      "answer": [
        <>Village of Thousands is committed to using the best sustainability and fair trade practices from
        our products to our packaging to our website. We do our homework and find vendors and materials
        that align with the company’s values to ensure that we can live up to
        our <span className="weight-5 italics special">GROWN IN THE USA</span> standards.
        Our goal is to maintain complete transparency and control over our supply chain with fair
        pay wages for anyone that participates in manufacture, design, and development.</>,
        <>Our garments are made from <b>100% organic <span className="italics">Supima®</span> cotton</b> from
        farms in the USA and manufactured by a vendor that is ISO certified at every step of the process. The
        designs and tagless stamps are all printed here in the USA. Even our packages are made from 100%
        recyclable materials, so we encourage you to help us in our efforts by recycling or reusing your
        packages when you receive some fresh new gear from us!</>,
        <>We believe sustainability goes beyond what we can provide for nature alone. It is the impact on our
        environment which includes how we treat ourselves and each other.</>,
        <><span className="italics"><b>SUSTAINABILITY with the ABILITY to SUSTAIN.</b></span></>,
        <>This is our motto. Our journey which starts from within. We believe
        that our impact and ability to give can only be as great as the work we put in to own self-care and
        the balance we maintain in our daily lives.</>,
        <>We are a community of like-minded individuals with high aspirations, sharing in our common interests
        in fashion and style with a passion for skateboard culture, offering a platform to share in a
        collective journey towards a common goal of sustainability. With support from each other we can
        maintain the physical and mental well being and clarity we seek within to achieve the most positive
        effect we can offer to the world.</>,
        <>We are on an everyday mission to better ourselves and our brand.
        Positivity breeds positivity so the best investments we can make are in ourselves and our community so
        that our VoT Enthusiasts will have the means to invest in themselves and their extended communities
        all around the world.</>,
        <>Sustainability is our primary core value and one of our biggest ways we can give back as a business.
        It is also the driving force for every person on our team. We are passionate about our work so when
        we created Village of Thousands the one thing we all knew for certain
        was that we want to see our work done right with only the finest materials and technologies from
        companies that take sustainability as seriously as we do.</>,
        <>We are always growing and adapting with this primary objective in the forefront of our mind.</>
      ]
    },
    {
      "question": "How can I become part of the community of VoT Enthusiasts?",
      "answer": [
        <>We are currently growing and developing our brand while building our community both online and
        locally. The best way to be a part of the community right now is to follow our social media
        accounts, buy our apparel when our first SZN drops, and rep our brand.</>,
        <>You can be an early VoT Enthusiast and create your account with an integrated crypto wallet so
        you can be ready for our Web 3.0 expansion. We will announce a date in 2022 and VoT Enthusiasts
        with verified wallets added to their accounts will b able to receive rewards and airdrops as soon
        as that date arrives.</>,
        <>Follow us on our socials to stay updated and be part of the community we're building for and
        with our fellow Enthusiasts.</>,
        <SocialCircles />
      ]
    },
    {
      "question": "Why will VoT be selling NFT-authenticated apparel and products?",
      "answer": [
        <>The VoT Digital HQ will be among the first wave of web apps to combine digital
        blockchain-authentication with physical product sales.</>,
        <>After our first SZN drop, we will sell our products linked to authenticated NFTs for potential
        collectors, investors, and VoT Enthusiasts. NFTs are just one amazing example of what Web 3.0 has to
        offer and will play a major role in the next phase of the decentralized web.</>,
        <>They are gaining tremendous support from buyers and sellers alike since blockchain technology now
        allows for creators to publish digital works that are uniquely identifiable, have verified ownership,
        and are created to be scarce in order to hold value just like any other physical collectible. By
        combining this technology with each product we sell, collector value of each item is increased with
        authentication in the form of unique digital art.</>,
        <>VoT has a team of designers and developers that are working together to bring our Village of
        Thousands to life. We're giving as much attention, customization, and care to our digital brand
        as we are with our physical product line. Our NFTs will consist of programmatically generated works and
        varying pieces of digital art. We are currently writing code and making art for some really
        exciting projects with endless creation possibilities that we cannot wait to share with you!</>
      ]
    },
    {
      "question": "What is a decentralized application (dApp)?",
      "answer": [
        <>DApps are, simply put, the future of websites and how customers form and build a relationship with
        brands. They offer the security and privacy of the blockchain network while using transparent
        technologies that are strong barriers to accessing your sensitive data from being collected by
        large, centralized corporations.</>,
        <>The State of the DApps, a curated list of over 1320 decentralized apps, defines decentralized
        apps as "...applications which run on a P2P network of computers, instead of one computer. They
        are considered to be a form of software program designed to function on the internet without being
        controlled by a single entity. DApps can have front-end code and user interfaces written in any
        language, just like a traditional application, which can make calls to its backend."</>,
        <>While we are not considered a blockchain dApp currently we do share the same ethos and if it
        benefits our community we will integrate this site onto the blockchain in the future as well.</>
      ]
    },
    {
      "question": "How is this website being developed to be Web 3.0 ready?",
      "answer": [
        <>Our developers and designers are working together to prepare for our complete Web 3.0 release in
        2023. This means that all of our online services will be integrated with blockchain technology and
        we intend to use cryptocurrency for all online purchases when our brand, and our community, is
        ready.</>,
        <>We realize that our world is still catching up to Web 3.0 so we will be
        offering our products for purchase with credit and debit cards through Stripe and we will make
        announcements with plenty of time for our VoT Enthusiasts to download the tools and get non-custodial
        wallets to participate in the exciting opportunity and ever-changing landscape of Web 3.0.</>,
        <>We will be continually upgrading and updating the website as well as hand selecting any other
        additional web services and choosing the ones that are most in alignment with our ethos. This site
        is built by our developers, line-by-line, in order to provide a sustainable decentralized platform
        for the future of our brand. Because of this process we are able to carefully vet and select every
        service we use and organically grow with Web 3.0 without restriction.</>,
        // <>Village of Thousands also has our very own, <a className='link underline'
        // href='https://ethereum.org/en/developers/docs/standards/tokens/erc-20/' target="_blank"
        // rel="noreferrer">ERC-20</a> token, VOT, ready for distribution in 2022 alongside our full Web 3.0
        // release. If you’d like to be able to trade, purchase, and invest in our token when it has been
        // released then make sure you have an account with a non-custodial wallet service, such
        // as <a className='link underline' href='https://metamask.io/download' target="_blank"
        // rel="noreferrer">MetaMask</a>, stored on a Web 3.0 integrated browser, such
        // as <a className='link underline' href='https://brave.com/download/' target="_blank"
        // rel="noreferrer">Brave Browser</a>. We are already in development of our NFT-authenticated products
        // and will be airdropping rewards as VOT token and limited runs of NFTs.</>,
        <>We have already set up our website to store your wallet address for quick, easy, and secure
        checkout using “browser injection”. Injection uses your in-browser wallet in order to verify that we
        have a correct address to send and receive assets so that you don’t need to worry about incorrectly
        inputting in an invalid address.</>,
        <>One major barrier for some people with sending and receiving crypto is that if the wallet
        address you send to does not match the address of the receiving wallet then the cryptocurrency or
        other digital crypto asset being sent may become permanently irretrievable. And that’s kinda scary.</>,
        <>We have eliminated this issue by using injection so if you wish to make
        purchases on our website and receive crypto rewards in the future then please follow the procedures
        outlined in the next section regarding the tools and services needed for any Web 3.0 site.</>,
        <>Our source code will be available online in a publicly accessible Github repository. If you are
        a Web 3.0 dev, or aspiring dev, feel free to follow along with our updates and offer feedback.</>
      ]
    },
    {
      "question": "What services and tools will I need to prepare myself for Web 3.0?",
      "answer": [
        <>There are a few apps you will need to download to be ready for Web 3.0 changes across the whole
        internet. Before you get started though, the first tools you need are a pen and paper.</>,
        <>Most Web 3.0 services use a BIP39 Mnemonic Code, or "seed phrase", which is a series of words
        unique to your account which you <u>MUST NOT LOSE</u> or you will lose your entire account and
        all assets associated with it if you happen to lose your password and do not have the seed phrase
        available for recovery.</>,
        <>Security is the top priority of blockchain services so be sure to document every account you make
        and save that information in a safe place. Thanks to emerging Web 3.0 tech there is virtually no
        way to hack into your accounts without the password and/or seed phrase so I’d say this is a fair
        tradeoff. While it may not be required to write the info on pen and paper, this method is the only
        sure way to have complete control over your security since the only way to access your wallet is
        with the mnemonic and/or password and storing it on your device opens you up to the
        possibility of data being exposed.</>,
        <>Some services also authorize access with digital identity apps instead of or alongside the mnemonic
        as well. <a className='link underline' href='https://global.id/' target="_blank"
        rel="noreferrer">GlobaliD</a> is the most commonly used service for this so we highly recommend you
        download and set up GlobaliD on your mobile device before proceeding to the next steps, though this
        step is optional unless one of the services you choose requires it.</>,
        <>Next, you will need to get a Web 3.0 browser. The browser we recommend, for a multitude of reasons,
        is <a className='link underline' href='https://brave.com/' target="_blank" rel="noreferrer">Brave
        Browser</a>. It has several built in integrations with different wallets to make it easy to gain
        rewards and support Web 3.0 brands like ours. If you are comfortable with Firefox or Chrome, Brave
        will be an easy switch and we doubt you will even look back after making the switch. It is capable
        of installing Google Chrome Extensions and built for privacy. Instead of seeing ads everywhere on
        websites, you can choose to view Brave sponsored ads which will pop up on occasion and you will
        earn rewards in their native BAT token which has steadily been gaining traction and attention.
        Brave is the leading Web 3.0 browser for a good reason and we hope you will look into it and
        give it a try so you can see why.</>,
        <>Brave is available for <a className='link underline' href='https://brave.com/download/'
        target="_blank" rel="noreferrer">download</a> on computers and mobile devices and allows for
        syncing between them.</>,
        <>Finally, you will need a non-custodial wallet. The most popular choice is <a
        className='link underline' href='https://metamask.io/' target="_blank"
        rel="noreferrer">MetaMask</a>. This is where your pen and paper are absolutely needed because
        you will be instructed to write down your mnemonic. It can be useful to have a couple backups
        of your account info but if you choose to save the info digitally we recommend that you store it
        locally and/or separately on an external flash drive as a screenshot or in a text file.</>,
        <>MetaMask is a Web 3.0 account manager in a browser extension which, as Brave Browser’s website
        states, provides a “bridge to explore and handle decentralized applications (dApps) from a web
        browser.”</>,
        <><a className='link underline' href='https://metamask.io/download' target="_blank"
        rel="noreferrer">Download MetaMask</a> and follow all instructions carefully while documenting all
        important information. Choose a secure password. We recommend that you choose a password that is
        unique to all of your other passwords. The extra effort to do this right from the beginning will
        be well worth your time.</>,
        <>Finally, <a className='link underline'
        href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en'
        target="_blank" rel="noreferrer">install the Chrome Extension for MetaMask</a> on your computer
        and enter your Secret Recovery Phrase given to you on signup of MetaMask.</>,
        <>That’s the basic setup. There are many options to consider but this is the method we recommend
        for ease of use. Coinbase Wallet is another non-custodial wallet that will be capable of purchasing
        and storing NFTs in 2022 as well so if you already have Coinbase then by all means use Coinbase
        Wallet. Just make sure that whatever wallet you choose is able to be read from browser injection
        so it must be available as a browser extension.</>
      ]
    },
    {
      "question": "How will I be receiving my free limited-edition NFT?",
      "answer": [
        <>We are going to release and send the first 200 customers a limited edition NFT from our first digital
        collection to their verified wallets before our Web 3.0 site is ready (late 2022). Your NFT
        will go directly into your wallet and any files you receive will be available to download
        from your Village of Thousands user account. This set of NFTs may vary in rarity and be randomly
        distributed amongst participating VoT Enthusiasts.</>,
        <>In order to receive the NFT you’ll need a wallet connected to your account so we’ve made it easy for
        you to add your wallet along with resources to help you prepare for Web 3.0. You’ll need a secure,
        verified wallet for making crypto purchases and accepting rewards and NFTs from brands like ours.
        Once you have completed your first purchase we will verify that you are a unique user and send
        instructions for claiming your first VoT NFT before we drop them so stay tuned!</>,
        <>While many browsers are beginning to integrate things like wallet extensions and dApp
        support, <a className='link underline' href='https://brave.com/download/' target="_blank"
        rel="noreferrer">Brave Browser</a> is already preloaded with a full suite of Web 3.0 integrated
        products and services.</>,
        <>We aren’t officially sponsored by Brave but you might see a few download links to their browser
        on our site because we highly recommend you use their browser. With their browser you can set yourself
        up for Web 3.0 and earn crypto rewards directly from Brave’s token (BAT), easily integrate your
        MetaMask account, and access wallets from popular providers. Brave Browser is available on all major
        mobile and computer operating systems.</>
      ]
    },
    {
      "question": "How do I get a wallet that can accept crypto and store NFTs?",
      "answer": [
        <>After you create and activate your VoT account, you will be able to optionally add your in-browser
        “non-custodial” Ethereum wallet address (such as one generated from MetaMask).</>,
        <>You will need a non-custodial wallet, which allows you to store and control your crypto assets
        so you to not only have access to your crypto tokens for payment, but also are able to store your
        NFTs.</>,
        <>The most popular app for easily obtaining and getting access to a non-custodial wallet
        is <a className='link underline' href='https://metamask.io/download' target="_blank"
        rel="noreferrer">MetaMask</a>.</>,
        <span className="container italics">
            “MetaMask is a software cryptocurrency wallet used to interact with the Ethereum blockchain.
            It allows users to access their Ethereum wallet through a browser extension or mobile app,
            which can then be used to interact with decentralized applications.”
        </span>,
        <>Please refer to our answer under "What services and tools will I need to prepare myself for Web
        3.0?" for a complete rundown of all tools you will need to be Web 3.0 ready.</>,
        <>You may add a wallet to your account at any time but remember, we are only giving
        away a limited amount of these NFTs so we encourage you to complete your account registration
        at signup. <Link href="/login"><a className="link thicc underline">Click here</a></Link> to create
        your VoT account today.</>
      ]
    },
    {
      "question": "This website uses cookies? Why?! Omg.. is my data being collected too???",
      "answer": [
        <>Yes we do use cookies... so that you can place orders with us. Breathe, my dude. Did you
        know cookies are just "small blocks of data created by a web server while a user is browsing
        a website and placed on the user's computer or other device by the user's web browser"? That
        means not all cookies are created equal and they can be used for good or for evil just like
        any other super power.</>,
        <>Our use of cookies, or any local storage method for that matter, is all related to the operations
        necessary for the website to function – such as login credentials, the Web3 Wallet app, and our
        order system. Most items are set to get deleted after a period of time as well.</>,
        <>Furthermore, we created this website line by line so that we choose what apps and APIs are
        connecting to this website and we know exactly what data is being collected and how it’s being
        used. We have total control over our system so that we are able to implement any changes instead
        of relying on website builders to make the right decisions, the tradeoff being development is
        difficult and takes longer than click-and-drag sites.</>,
        <>This is going to be a forever project for us so we are preparing to grow and adapt with the
        exciting transition into Web3 and the Metaverse. We’re learning with everyone else. If you have
        any recommendations or thoughts to add to this conversation we encourage you to send us a DM on
        one of our social media accounts. We want to hear directly from our VoT Enthusiasts like you so
        that we can create a safe space for everyone and focus on the good we can do together and all
        the fun we plan on having as a community.</>
      ]
    },
    {
      "question": "Where can I report bugs?",
      "answer": [
        <>Please visit our GitHub repository <Link href="https://github.com/gravyhtx/village-of-thousands">
        <a className="link underline" target="_blank"
        rel="noreferrer">here</a></Link> or message our developers on Instagram
        (<Link href="https://www.instagram.com/gravydesignco/"><a className="link underline" target="_blank"
        rel="noreferrer">@gravydesignco</a></Link> or <Link href="https://www.instagram.com/villageofthousands/">
        <a className="link underline"target="_blank" rel="noreferrer">@villageofthousands</a></Link>) to
        report any bugs or issues with our website.</>
      ]
    }
  ]

  // https://github.com/gravyhtx/village-of-thousands
  return (questions)
}

export default FaqContent;

