import site from "../config/site-data.json";

export const website = () => {
  const info = {
    payment: [
      {
        method: "Zelle/ApplePay",
        type: "Cash",
        sendTo: process.env.CONTACT_PHONE
      },{
        method: "Gemini",
        type: "Crypto",
        sendTo: process.env.WALLET_ADDRESS
      }
    ]
  }
  return info;
}

export const team = () => {
  const info = {
    jc: {
      name: "Juancarlos Villamil",
      titles: ["Founder", "Owner"],
      roles: ["Business Director"],
      contact: {
        phone: process.env.JC_PHONE,
        email: process.env.JC_EMAIL
      },
      links: [{
        siteName: "Instagram",
        url: "https://instagram.com/VillageOfThousands" },{
        siteName: "Twitter",
        url: "https://twitter.com/VoThousands"
      }],
      quote: "",
      bio: ""
    },

    andrew: {
      name: "Andrew Richard",
      titles: ["Co-Founder"],
      roles: ["Creative Director", "Front-End Development"],
      contact: {
        phone: process.env.AR_PHONE,
        email: process.env.AR_EMAIL
      },
      links: [{
        siteName: "Instagram",
        url: "https://instagram.com/VillageOfThousands" },{
        },{
        siteName: "Github",
        url: "https://github.com/AndresLong01"
        },{
        siteName: "Gravy Design Co.",
        url: "https://gravydesign.co"
      }],
      quote: "All out of bubblegum.",
      bio: ""
    },

    andres: {
      name: "Andres Long",
      titles: ["Technology Director"],
      roles: ["Site Manager", "Back--End Development"],
      contact: {
        phone: process.env.AL_PHONE,
        email: process.env.AL_EMAIL
      },
      links: [{
        siteName: "Instagram",
        url: "https://instagram.com/"
        },{
        siteName: "Github",
        url: "https://github.com/AndresLong01"
      }],
      quote: "",
      bio: ""
    },
  }
  return info;
}