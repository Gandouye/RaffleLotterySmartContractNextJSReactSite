"use client";
import React, { useState, useEffect } from "react";
import { useReadContract, useAccount, useWatchContractEvent } from "wagmi";
import { config } from "../../blockchain/config/index";
import { parseEther } from "viem";
import { abi, contractAddresses } from "../../constances";

//import useNetworkData from './useNetworkData';
//import { handleError } from '@/lib/utils/errors';

const ReadNumberOfPlayers = () => {
  const account = useAccount();
  const { address, isConnected } = useAccount();
  const [playersNumber, setPlayersNumber] = useState(0);

  //console.log("account =" + JSON.stringify(account));
  const chainId = parseInt(account.chainId);
  //console.log("chainId =" + chainId);
  const contractAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;
  //console.log("contractAddress =" + contractAddress);

  let result = 0;
  //let data, error, isPending;

  //Reading the number of players
  if (isConnected) {
    const { data, error, isPending } = useReadContract({
      abi,
      address: contractAddress,
      functionName: "getNumberOfPlayers",
      args: [],
      account: account,
      chainId: chainId,
      config,
    });

    //console.log("data =" + data);
    if (typeof data === "undefined") {
    } else {
      typeof data === "bigint"
        ? (result = Number(BigInt(data)))
        : (result = data);
    }
    //if (document.getElementById("resultbox")) {
    //  document.getElementById("resultbox").innerHTML = result;
    //}
  }

  //Updating the number of players every time someone enters the raffle
  let result2 = 0;
  useWatchContractEvent({
    address: contractAddress,
    abi,
    eventName: "RaffleEnter",
    pollingInterval: 1_000,
    onLogs(logs) {
      //console.log("New logs!", logs);
      const { data: data2 } = useReadContract({
        abi,
        address: contractAddress,
        functionName: "getNumberOfPlayers",
        args: [],
        account: account,
        chainId: chainId,
        config,
      });

      //console.log("data =" + data);
      if (typeof data2 === "undefined") {
      } else {
        typeof data2 === "bigint"
          ? (result2 = Number(BigInt(data2)))
          : (result2 = data2);
      }
      //if (document.getElementById("resultbox")) {
      //  document.getElementById("resultbox").innerHTML = result2;
      //}
      result = result2;
    },
  });

  //Updating the number of players everytime a winner is picked
  result2 = 0;
  useWatchContractEvent({
    address: contractAddress,
    abi,
    eventName: "WinnerPicked",
    pollingInterval: 1_000,
    onLogs(logs) {
      //console.log("New logs!", logs);
      const { data: data3 } = useReadContract({
        abi,
        address: contractAddress,
        functionName: "getNumberOfPlayers",
        args: [],
        account: account,
        chainId: chainId,
        config,
      });

      //console.log("data =" + data);
      if (typeof data3 === "undefined") {
      } else {
        typeof data3 === "bigint"
          ? (result2 = Number(BigInt(data3)))
          : (result2 = data3);
      }
      //if (document.getElementById("resultbox")) {
      //  document.getElementById("resultbox").innerHTML = result2;
      //}
      result = result2;
    },
  });

  useEffect(() => {
    setPlayersNumber(result);
    //setPlayersNumber(result);
  }, [result, result2]);

  return (
    <span>
      <span className="text-base text-grey-700" id="resultbox">
        {playersNumber}
      </span>
      {/*error && (
        <span className="text-red-400 text-sm">
          Error reading the Raffle Contract.
        </span>
      )}
      {isPending && (
        <span className="text-blue-400 text-sm">
          Loading data from the Raffle Contract.
        </span>
      )*/}
    </span>
  );
};
export default ReadNumberOfPlayers;
