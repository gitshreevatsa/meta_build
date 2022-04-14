<div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>META BUILD</title>
      </Head>
      <main id="body">
        <h3 className="twitter-title">Twitter ID</h3>
        <form className="form-container">
          <label className="twitter-label">
            <input
              type="text"
              className="twitter"
              placeholder="@twitterID"
              name="twitter"
              onChange={(e) => setTwitter(e.target.value)}
            />
          </label>
        </form>
        <h3 className="wallet-title">Metamask or TrustWallet ID</h3>
        <div className="wallet-div">
          <label className="wallet-label">
            <input
              type="text"
              className="walletID"
              placeholder="Wallet ID"
              name="Wallet"
              value={walletID}
              onChange={(e) => setWalletID(e.target.value)}
            />
          </label>
        </div>
        <br />{" "}
        {!currentAccount && (
          <button className="walletConnect" onClick={walletConnected}>
            Connect Wallet
          </button>
        )}
        <button className="button-style" id="submit" onClick={submit}>
          {!isLoading ? "Continue" : "Please Wait"}
        </button>
        <h3 id="error-throwback"></h3>
      </main>
    </div>
  