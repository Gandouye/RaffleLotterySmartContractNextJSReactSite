"use client";
import React, { useState } from "react";
import { useReadContract, useAccount } from "wagmi";
import { config } from "../../blockchain/config/index";
import { parseEther } from "viem";
import { abi, contractAddresses } from "../../constances";

//import useNetworkData from './useNetworkData';
//import { handleError } from '@/lib/utils/errors';

const ReadContract = ({ functionName }) => {
  const account = useAccount();
  const { address } = useAccount();

  //console.log("account =" + JSON.stringify(account));
  const chainId = parseInt(account.chainId);
  //console.log("chainId =" + chainId);
  const contractAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;
  //console.log("contractAddress =" + contractAddress);

  const { data, error, ispending } = useReadContract({
    abi,
    address: contractAddress,
    functionName: functionName,
    args: [],
    account: account,
    chainId: chainId,
    config,
  });

  let result;
  //typeof data === "bigint" ? (result = data.toString()) : (result = data);
  if (typeof data === "bigint") {
    if (functionName == "getEntranceFee") {
      result = Number(BigInt(data));
      result = result / 1000000000000000000;
    } else {
      result = data.toString();
    }
  } else {
    result = data;
  }

  return (
    <span>
      <span className="text-base text-grey-700">{result}</span>
      {error && (
        <span className="text-red-400 text-sm">
          Error reading the Raffle Contract.
        </span>
      )}
      {ispending && (
        <span className="text-blue-400 text-sm">
          Loading data from the Raffle Contract.
        </span>
      )}
    </span>
  );
};
export default ReadContract;
