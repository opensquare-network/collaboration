import { useConnectors } from "wagmi";
import { useMemo } from "react";

export function useConnector(connectorId) {
  const connectors = useConnectors();
  return useMemo(
    () => connectors.find((c) => c.id === connectorId),
    [connectors, connectorId],
  );
}
