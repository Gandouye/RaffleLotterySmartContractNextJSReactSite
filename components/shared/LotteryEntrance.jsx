"use client";
import * as React from "react";
import { useAccount } from "wagmi";
import { injected } from "@wagmi/connectors";
import { config } from "../../blockchain/config/index";
import { parseEther } from "viem";
import { abi, contractAddresses } from "../../constances";
import { useState, useEffect } from "react";
import ReadContract from "./ReadContract";
import WriteContract from "./WriteContract";
import ReadNumberOfPlayers from "./ReadNumberOfPlayers";

const LotteryEntrance = () => {
  //console.log("abi =" + JSON.stringify(abi));
  //console.log("contractAddresses =" + JSON.stringify(contractAddresses));

  const account = useAccount();
  const { address, isConnected } = useAccount();

  //console.log("account =" + JSON.stringify(account));
  const chainId = parseInt(account.chainId);
  //console.log("chainId =" + chainId);
  const contractAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;
  //console.log("contractAddress =" + contractAddress);

  return (
    <div className="text-xl w-full p-1">
      {contractAddress ? (
        <div>
          <div className="text-base text-grey-700 pt-4">
            <WriteContract />
          </div>

          <div className="text-base text-grey-700 pt-4">
            Minimum Entrance Fee &gt;{" "}
            <ReadContract functionName="getEntranceFee" /> Eth
          </div>
          <div className="text-base text-grey-700">
            Number of players: <ReadNumberOfPlayers />
          </div>
          <div className="text-base text-grey-700">
            Recent Winner: <ReadContract functionName="getRecentWinner" />
          </div>
          <div className="text-base text-grey-700 pt-4">
            Contract Address: {contractAddress}
          </div>
        </div>
      ) : (
        <div className="text-red-400 text-lg">
          No Raffle address detected...
        </div>
      )}
    </div>
  );
};
export default LotteryEntrance;
