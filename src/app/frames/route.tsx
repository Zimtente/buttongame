/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";
import { getGameStats } from "@/app/stats";

const handleRequest = frames(async (ctx) => {
  try {
    const { currentWinner, potDegen, blocksToGo } = await getGameStats();

    return {
      image: (
        <div tw={"h-full w-full flex flex-col items-center justify-center bg-black"}>
          <span tw={"text-[48px] font-bold mb-5 flex text-white"}>{"BUTTON GAME🟣"}</span>

          <span tw={"pt-2"}>{"⬇️⬇️⬇️⬇️⬇️"}</span>

          <span tw={"pb-8 text-white"}>{"Last DEGEN to press the button wins"}</span>

          <div tw={"flex flex-row items-center"}>
            <span tw={"text-[32px] font-bold mb-5 flex text-white pr-2"}>{"POT "}</span>
            <span tw={"text-[48px] font-bold mb-5 flex text-white"}>{`🎩 ${potDegen}`}</span>
          </div>

          <div tw={"pt-4 flex flex-col items-center"}>
            <span tw={"text-[32px] text-white pr-1"}>{"LAST DEGEN 🎩"}</span>
            <span tw={"text-[48px] text-violet-500"}>{currentWinner}</span>
          </div>

          <div tw={"pt-8 flex flex-row items-center"}>
            <span tw={"text-[32px] text-white pr-1"}>{"BLOCKS LEFT: "}</span>
            <span tw={"text-[32px] text-violet-500 pr-1"}>{blocksToGo}</span>
          </div>
        </div>
      ),
      buttons: [
        <Button action={"post"} target={"/"}>{"Stats ⟳"}</Button>,
        <Button action={"tx"} target={"/play"} post_url={"/"}>
          {"Play"}
        </Button>,
      ],
    };
  } catch (e) {
    console.error(e);
    return {
      image: (
        <div tw={"flex flex-col items-center justify-center"}>
          <span tw={"text-black"}>{"Unknown Error"}</span>
        </div>
      ),
      buttons: [
        <Button action={"post"} target={"/"}>{"Retry ⟳"}</Button>,
      ],
    };
  }
});

export const GET = handleRequest;
export const POST = handleRequest;