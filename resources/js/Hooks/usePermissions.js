import { useMemo } from "react";

export function usePermission(usePermission) {
    return {
        can: (permissionName) => usePermission.includes(permissionName),
    }
}