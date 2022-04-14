import NextCors from "nextjs-cors";
import { db } from "../../next.config";
export default async function save(req, res) {
  console.log("---------------USING-----------");
  try {
    await NextCors(req, res, {
      // Options
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
      origin: "*",
      optionsSuccessStatus: 200,
    });

    const twitterID = JSON.parse(req.body).twitter;
    const walletID = JSON.parse(req.body).walletID;
    console.log(twitterID, walletID)
    if (twitterID) {
      console.log("------accessedd--------");
      const usersDb = db.collection("logged-In");
      const user = usersDb.doc(twitterID);
      console.log("---------------------------Yes------------------");
      await user.set({
        id: `${twitterID}`,
        Wallet: `${walletID}`,
      });
      console.log("----------------200-------------");
      return res.status(200).json({ message: "SUCCESS", code: 200 });
    }
  } catch (error) {
    console.log("--------------------------");
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
}
