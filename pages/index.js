import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [twitter, setTwitter] = useState();
  const [walletID, setWalletID] = useState();
  const [isLoading, setLoading] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");

  async function submit() {
    if (twitter && walletID.length > 0) {
      setLoading(true);
      fetch("https://meta-build.vercel.app/api/save", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({ twitter: twitter, walletID: walletID }),
      })
        .then(async (result) => {
          console.log("--------Not being accessed----------");
          const data = await result.json();
          if (data.code === 200) {
            setLoading(false);
            document.getElementById("error-throwback").innerHTML =
              "You are on the wailist";
          } else {
            setLoading(false);
            console.log("ERROR", data);
            document.getElementById("error-throwback").innerHTML = "ERROR";
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log("ERROR", error);
        });
    } else {
      setLoading(false);
      document.getElementById("error-throwback").innerHTML =
        "Please enter valid address";
    }
  }

  const walletConnectcheck = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });
      ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          console.log(`Using account ${accounts[0]}`);
          setWalletID(accounts[0]);
        } else {
          console.error("0 accounts.");
        }
      });
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setWalletID(account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const walletConnected = () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
      setWalletID(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    walletConnectcheck();
  }, []);

  return (
    <div className="body">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>META BUILD</title>
      </Head>
      <div className="images">
        <Image
          className="img1"
          src="/beta.png"
          alt="METABUILD LOGO"
          width={170}
          height={150}
        />
      </div>
      <div className="intro">
        <h2>
          MetaBuild is building the premier Shopping Verse with 3D movie
          theatres, magic portals, gaming and dynamic maps!
        </h2>
        <br />
        <br />
        <h4>
          Sign-up for the early access list and be eligible for airdrops and
          private sale of Builder Tokens - the currency of the Shopping Verse.
        </h4>
      </div>
      <h3 className="twitter-title">Twitter ID</h3>
      <div className="twitter-input">
        <input
          type="text"
          className="twitter"
          placeholder="@twitterID"
          name="twitter"
          onChange={(e) => setTwitter(e.target.value)}
        />
      </div>
      <h3 className="wallet-title">Wallet ID</h3>
      <div className="wallet-input">
        <div className="form-group">
          <form id="form">
            <label></label>
            <input
              type="text"
              className="walletID"
              name="Wallet"
              placeholder="Wallet ID"
              value={walletID}
              onChange={(e) => setWalletID(e.target.value)}
            />
          </form>
        </div>
      </div>
      {!currentAccount && (
        <button id="submit" onClick={walletConnected}>
          Connect Wallet
        </button>
      )}
      <div></div>
      <br />
      <button className="button-style" onClick={submit}>
        {!isLoading ? "Submit" : "Please Wait"}
      </button>
      <br />
      <h3 id="error-throwback"></h3>
      <br />
      <br />
      <br />
      <br />
      {/* <br />
      <br />
      <br />
      <br />
      <br />
      <br /> */}
      <div></div>
    </div>
  );
}
