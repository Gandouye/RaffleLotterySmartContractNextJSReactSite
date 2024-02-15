//import { Inter } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";

//import { config } from "@/config";
import { config } from "@/blockchain/config";
import { Web3Modal } from "@/context/web3Modal";

//const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Raffle Next JS front End",
  description: "Raffle Next JS with Wagmi and web3Modal Web3 App",
};

export default function RootLayout({ children }) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));
  return (
    <html lang="en" data-theme="dark">
      <body>
        <Web3Modal initialState={initialState}>{children}</Web3Modal>
      </body>
    </html>
  );
}
