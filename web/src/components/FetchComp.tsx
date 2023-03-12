import React from "react";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { BASE_URL_API } from "../utils/vars";
import Loading from "./Loading";
type Props = { route: string; queryKey: string };
const queryClient = new QueryClient();

const FetchComp = ({ route, queryKey }: Props) => {
  function fetchFn(): Promise<any> {
    return fetch(BASE_URL_API + route).then((d) => d.json());
  }
  const { isLoading, isError, isFetched, data } = useQuery({
    queryKey: [queryKey],
    queryFn: fetchFn,
  });
  if (isLoading) return <Loading />;
  if (isError) return "Erro";

  if (isFetched) return data;
};
