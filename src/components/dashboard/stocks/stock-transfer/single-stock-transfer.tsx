"use client";

import {
  useApproveOrDeclineRequestOrTransfer,
  useSingleStockTransfer,
} from "@/queries/stocks";

import { ApiErrorMessage } from "@/components/messages/api-error-message";
import CustomButton from "../../custom-button";
import { Spinner } from "@/components/spinner";
import { useParams } from "next/navigation";

export function SingleStockTransfer() {
  const params = useParams();
  const { stockTransferId } = params as { stockTransferId: string };

  const { mutate: approve, isPending: pendingApprove } =
    useApproveOrDeclineRequestOrTransfer("stock-transfer", {
      guid: stockTransferId,
      action: "APPROVE",
    });
  const { mutate: decline, isPending: pendingDecline } =
    useApproveOrDeclineRequestOrTransfer("stock-transfer", {
      guid: stockTransferId,
      action: "DECLINE",
    });
  const {
    data: stockTransfer,
    isError,
    error,
    isPending,
  } = useSingleStockTransfer(stockTransferId);

  if (isError) {
    return <ApiErrorMessage message={error?.message} />;
  }

  if (isPending) {
    return (
      <div className="flex w-full items-center justify-center h-full">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <div className=" w-full p-4 justify-between items-start gap-6 inline-flex border border-muted-150 rounded-md">
        <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
          <div className="self-stretch text-slate-500 text-sm font-medium leading-[18px]">
            Date requested:
          </div>
          <div className="self-stretch text-slate-700 text-xs font-semibold leading-[18px]">
            {new Date(stockTransfer?.data?.createdAt ?? "").toLocaleDateString(
              "en-US",
            )}
          </div>
        </div>
        <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
          <div className="self-stretch text-slate-500 text-sm font-medium leading-[18px]">
            Requesting from:
          </div>
          <div className="self-stretch text-slate-700 text-sm font-semibold leading-[18px]">
            {stockTransfer?.data?.fromBranch?.name}
          </div>
        </div>
        <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
          <div className="self-stretch text-slate-500 text-sm font-medium leading-[18px]">
            Total quantity:
          </div>
          <div className="self-stretch text-slate-700 text-sm font-semibold leading-[18px]">
            {stockTransfer?.data?.quantity}
          </div>
        </div>
      </div>
      <div className="mt-8 w-full p-4 rounded-lg border border-muted-150 justify-between items-start inline-flex">
        <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
          <div className="self-stretch text-slate-500 text-sm font-medium leading-[18px]">
            Stock name:
          </div>
          <div className="self-stretch text-slate-700 text-sm font-semibold leading-[18px]">
            {stockTransfer?.data?.stockData?.name}
          </div>
        </div>
        <div className="flex-col justify-start items-start gap-2 inline-flex">
          <div className="self-stretch text-slate-500 text-sm font-medium leading-[18px]">
            Quantity:
          </div>
          <div className="self-stretch text-slate-700 text-sm font-semibold leading-[18px]">
            {stockTransfer?.data?.quantity}
          </div>
        </div>
      </div>
      <div className="w-full ml-auto flex justify-end">
        <div className=" mt-8 flex items-center gap-4">
          <CustomButton
            onClick={() => {
              decline({
                guid: stockTransfer?.data?.guid,
                action: "DECLINE",
              });
            }}
            className=" text-slate-700 shadow border border-slate-50 w-fit"
            label="Decline"
            pendingLabel={<Spinner className="" />}
            isPending={pendingDecline}
          />
          <CustomButton
            onClick={() => {
              approve({
                guid: stockTransfer?.data?.guid,
                action: "APPROVE",
              });
            }}
            className="bg-primary-100 text-white border-primary-100 hover:bg-primary-100/90 w-fit"
            label="Accept"
            pendingLabel={<Spinner className=" border-white" />}
            isPending={pendingApprove}
          />
        </div>
      </div>
    </div>
  );
}
