import { fetchJson } from "@/actions/feching-data";
import Transformer from "@/components/Tranformer";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};
const Page = async ({ params }: Props) => {
  const data = await fetchJson(params.id);
 

  return (
    <div>
      <Transformer  data = {data.files[0].content}  />
    </div>
  );
};

export default Page;
