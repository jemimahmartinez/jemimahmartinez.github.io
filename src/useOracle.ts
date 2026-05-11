import { useMemo } from "react";

import oracleData from "./oracle.json";

const format = (template: string, vars: Record<string, string>) =>
  template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? `{${key}}`);

export const useOracle = () =>
  useMemo(
    () => ({
      ...oracleData,
      insights: {
        ...oracleData.insights,
        failedToLoad: (err: string) =>
          format(oracleData.insights.failedToLoadTemplate, { err }),
      },
    }),
    []
  );
