import { useEffect, useState } from "react";
import imgDesktop from "../assets/images/illustration-sign-up-desktop.svg";
import imgMobile from "../assets/images/illustration-sign-up-mobile.svg";
import iconList from "../assets/images/icon-list.svg";
import Modal from "./Modal";

const Container = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [error, setError] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const reset = () => {
    setEmail("");
    setCompleted(false);
    setError(null);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Valid email required");
      return;
    }

    setCompleted(true);
  };

  return (
    <>
      <Modal reset={reset} email={email} open={completed} />
      <div className="h-screen w-full bg-white md:flex md:h-auto md:w-full md:max-w-[1000px] md:flex-row-reverse md:rounded-4xl md:p-7 xl:gap-10">
        <img
          src={screenWidth < 768 ? imgMobile : imgDesktop}
          alt="illustration-img"
          className="h-[40%] w-full rounded-b-2xl md:rounded-2xl object-cover md:h-auto md:w-[50%] md:object-center xl:w-[40%]"
        />

        <div className="xs:space-y-10 xs:p-10 h-[60%] space-y-5 p-5 text-blue-800">
          <div className="xs:space-y-5 space-y-3">
            <h1 className="text-4xl font-bold md:text-5xl xl:text-6xl">
              Stay Updated!
            </h1>

            <p className="text-lg">
              Join 60,000+ product managers receiving monthly updates on:
            </p>

            <ul className="xs:space-y-5 xs:text-lg space-y-3">
              <li className="list-item">
                <img src={iconList} alt="icon-list" />
                Product discovery and building what matters
              </li>

              <li className="list-item">
                <img src={iconList} alt="icon-list" />
                Measuring to ensure updates are a success
              </li>

              <li className="list-item">
                <img src={iconList} alt="icon-list" />
                And much more!
              </li>
            </ul>
          </div>

          <form onSubmit={submit} className="xs:space-y-5 space-y-3">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <label className="font-bold" htmlFor="email">
                  Email adress
                </label>
                <p className="text-red font-semibold">{error}</p>
              </div>
              <input
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@company.com"
                className={`${error && "bg-red/25 border-red text-red"} border-gray rounded-md border p-4 pl-7`}
              />
            </div>
            <input
              type="submit"
              value="Subscribe to monthly newsletter"
              className="xs:text-lg w-full cursor-pointer rounded-md bg-blue-800 py-4 text-center font-semibold text-white transition-colors duration-300 hover:bg-red"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Container;
