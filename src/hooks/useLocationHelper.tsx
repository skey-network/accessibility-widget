import { useLocation } from "wouter";
import { useMemo } from "react";

const preparePath = (path: string) => {
  path = path.split("#")[0].split("?")[0];
  if (path.length === 0) path = "/";
  if (path.charAt(0) === "/" && path.length > 1) path = path.substring(1);
  if (path.charAt(path.length - 1) === "/" && path.length > 1) path = path.substring(0, path.length - 1);

  return path;
};

export default function useLocationHelper(paths: string[]) {
  const [location] = useLocation();
  const visible = useMemo(() => {
    if (paths.includes("*")) return true;

    const path = preparePath(location.replace(window.location.origin, ""));
    return (
      paths.find((element) => {
        const ready = preparePath(element);
        if (ready.startsWith(":")) {
          return path === ready.substring(2);
        }
        return path.endsWith(ready);
      }) !== undefined
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return { location, visible };
}
