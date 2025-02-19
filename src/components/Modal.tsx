import { useEffect, useState } from "react";
import successImg from "../assets/images/icon-success.svg";
import Modal from "react-modal";

const desktopStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "550px",
    borderRadius: 35,
    border: "none",
  },
  overlay: {
    backgroundColor: "hsl(235, 18%, 26%)",
  },
};

const mobileStyles = {
  content: {
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    marginRight: "0",
    transform: "none",
    width: "auto",
    borderRadius: 0,
    border: "none",
  },
  overlay: {
    backgroundColor: "",
  },
};

Modal.setAppElement("#root");

interface PropsType {
  open: boolean;
  reset: () => void;
  email: string;
}

const modal = ({ open, reset, email }: PropsType) => {

      const [modalStyle, setModalStyle] = useState(desktopStyles);

      useEffect(() => {
        const handleResize = () => {
          setModalStyle(
            window.innerWidth >= 768 ? desktopStyles : mobileStyles,
          );
        };

        handleResize(); // Nastaví správný styl při načtení
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
      }, []);


  return (
    <Modal isOpen={open} style={modalStyle}>
      <div className="flex h-full flex-col px-7 py-10 text-blue-700 md:gap-10">
        <div className="flex h-[90%] flex-col justify-center gap-10">
          <img className="w-16" src={successImg} alt="success-img" />
          <h1 className="text-4xl font-bold md:text-5xl">
            Thanks for subscribing!
          </h1>
          <p className="text-lg">
            A confirmation email has been sent to{" "}
            <span className="font-bold">{email}</span>. Please open it and click
            the button inside to confirm your subscription
          </p>
        </div>
        <div className="h-[10%] w-full">
          <button
            className="hover:bg-red w-full cursor-pointer rounded-md bg-blue-800 py-4 text-lg text-white transition-colors duration-300"
            onClick={reset}
          >
            Dismiss message
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default modal;
