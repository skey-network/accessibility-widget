import type { CSSProperties } from "react";
import classNames from "classnames";

export interface Position {
  horizontalPos: "left" | "right";
  verticalPos: "top" | "bottom";
  horizontal: string;
  vertical: string;

  horizontalFlip?: "auto" | boolean;
  verticalFlip?: "auto" | boolean;
}

export interface PositionInfo {
  style: CSSProperties;
  className: string;
}

export function getPositionInfo({
  horizontalPos,
  verticalPos,
  horizontal,
  vertical,
  horizontalFlip,
  verticalFlip
}: Position): PositionInfo {
  const flip = {
    horiz: horizontalFlip ?? "auto",
    vert: verticalFlip ?? "auto"
  };
  const horizontalMove = horizontal !== "0" ? (horizontalPos === "left" ? " - " : " + ") + horizontal : "";

  return {
    className: classNames(
      {
        "accessibility-invert-horizontal": flip.horiz === true || (flip.horiz === "auto" && horizontalPos === "right"),
        "accessibility-invert-vertical": flip.vert === true || (verticalPos === "top" && flip.vert === "auto")
      },
      `horizontal-${horizontalPos}`,
      `vertical-${verticalPos}`
    ),
    style: {
      position: "fixed",
      top: verticalPos === "top" ? vertical : undefined,
      bottom: verticalPos === "bottom" ? vertical : undefined,
      left: horizontalPos === "left" ? horizontal : undefined,
      right: horizontalPos === "right" ? horizontal : undefined,
      transform: `translateX(calc(${horizontalPos === "left" ? `-100% + 60px` : "100% - 60px"}${horizontalMove}))`
    }
  };
}
