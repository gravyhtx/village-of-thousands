import { MiCon } from '../icons/MatIco';
import { useRouter } from 'next/router';

const PrintHeader = ({ printLinks, setPrintActivate, openModal, setOpenModal }) => {

  const router = useRouter();

  const printlinks = [
    { name: "Account", ref: "person", alt: "Go to your Account", onClick: () => click('1') },
    { name: "Open Settings", ref: "settings", alt: "Open Print Settings", onClick: () => openSettings() },
    { name: "Print Orders", ref: "print", alt: "Print Orders", onClick: () => setPrintActivate(true) },
    { name: "Go Back", ref: "keyboard_return", alt: "Go Back to Admin Home", onClick: () => router.reload(window.location.pathname) },
  ];

  const openSettings = () => {
    console.log(openModal)
    setOpenModal(!openModal);
  }

  const click = (item) => {
    console.log(item)
  }

  return (
    <div className={"micon-nav disable-highlight row"+(location === '/' ? ' home': '')} role="navigation" aria-label="Site Navigation" id="top-nav">
      {printlinks.map((item, index) => <>
          <MiCon
            name={item.name}
            icon={item.ref}
            url={'js'}
            alt={item.alt}
            useButton={false}
            onClick={item.onClick}
            navColsTotal={4}
            index={index} /></>
      )}
    </div>
  );
}

export default PrintHeader;