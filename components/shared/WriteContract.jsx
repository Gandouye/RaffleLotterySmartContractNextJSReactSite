"use client";
import React, { useState } from "react";
import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";
import { config } from "../../blockchain/config/index";
//import { parseEther } from "viem";
import { abi, contractAddresses } from "../../constances";
import { injected } from "@wagmi/connectors";

//import useNetworkData from './useNetworkData';
//import { handleError } from '@/lib/utils/errors';

const WriteContract = () => {
  const [ethToContribute, setEthToContribute] = useState("");
  //const [waitTransact, setWaitTransact] = useState(0);

  const account = useAccount();
  const { address } = useAccount();

  //console.log("account =" + JSON.stringify(account));
  const chainId = parseInt(account.chainId);
  //console.log("chainId =" + chainId);
  const contractAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;
  //console.log("contractAddress =" + contractAddress);

  const { data, isPending } = useReadContract({
    abi,
    address: contractAddress,
    functionName: "getEntranceFee",
    args: [],
    account: account,
    chainId: chainId,
    config,
  });

  let result = 0;
  if (typeof data === "bigint") {
    result = Number(BigInt(data));
    result = result / 1000000000000000000;
  } else {
    result = data;
  }
  //setEthToContribute(result);

  const { data: hash, error, writeContract } = useWriteContract({ config });

  async function submitForm(e) {
    e.preventDefault();
    //console.log("value = ", ethToContribute);

    writeContract({
      address: contractAddress,
      abi,
      functionName: "enterRaffle",
      args: [],
      value: BigInt(Number(ethToContribute) * 1000000000000000000),
      account: account,
      chainId: chainId,
    });

    //setWaitTransact(waitTransact + 1);
  }

  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  return (
    <div>
      <form onSubmit={submitForm}>
        <input
          id="value"
          required
          className="input input-bordered w-30 text-lg"
          onChange={(e) => {
            setEthToContribute(e.target.value);
          }}
          defaultValue={result}
        />
        <span className="text-sm px-2"> ETH </span>
        <button
          disabled={isPending || isLoading}
          className="btn btn-neutral rounded-full s-0 w-100 text-lg "
        >
          {isPending || isLoading ? (
            <span>
              <span className="loading loading-spinner"></span> Confirming...
            </span>
          ) : (
            "Enter Raffle Lottery"
          )}
        </button>

        {hash && (
          <div className="text-slate-400 text-xs">Transaction Hash: {hash}</div>
        )}

        {isLoading && (
          <div className="text-blue-400 text-sm">
            Waiting for confirmation...
          </div>
        )}

        {isSuccess && (
          <div className="text-green-400 text-sm">
            Success... Transaction confirmed!
          </div>
        )}

        {error && (
          <div className="text-red-400 text-sm">
            Error: {error.shortMessage || error.message}
          </div>
        )}
      </form>
    </div>
  );
};
export default WriteContract;
