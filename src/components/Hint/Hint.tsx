import { type CSSProperties, useRef, useState } from "react";

import classNames from "classnames";

import { InfoIcon } from "@assets/icons";
import {
  arrow,
  autoUpdate,
  flip,
  FloatingDelayGroup,
  FloatingPortal,
  offset,
  shift,
  type Placement,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useTransitionStyles
} from "@floating-ui/react";

import "./Hint.scss";

export interface HintProps {
  children?: string;
  className?: string;
  cssProps?: CSSProperties;
  floating: {
    offset: number;
    padding: number;
    placement: Placement;
  };
}

export interface SimpleHintProps {
  children?: string;
  className?: string;
  cssProps?: CSSProperties;
}

export default function Hint({ children, className, cssProps, floating }: HintProps) {
  const arrowRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    middleware: [
      offset(floating.offset),
      shift({ padding: floating.padding }),
      flip(),
      arrow({
        element: arrowRef,
        padding: floating.padding
      })
    ],
    whileElementsMounted: autoUpdate,
    strategy: "absolute",
    placement: floating.placement,
    open: visible,
    onOpenChange: setVisible
  });

  const { styles, isMounted } = useTransitionStyles(context, {
    open: {
      opacity: 1,
      pointerEvents: "unset"
    },
    close: {
      opacity: 0,
      pointerEvents: "none"
    }
  });

  const hover = useHover(context);
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss]);

  const referenceProps = getReferenceProps();
  const floatingProps = getFloatingProps();

  const mainClass = classNames("access-hint-wrapper", className);
  const contentClass = classNames("access-hint-content", { visible });

  return (
    <div className={mainClass} tabIndex={0} aria-label={children} ref={refs.setReference} {...referenceProps}>
      <InfoIcon className="access-hint-clickable" />
      {isMounted && (
        <FloatingPortal>
          <FloatingDelayGroup delay={200}>
            <div
              className={contentClass}
              ref={refs.setFloating}
              style={{ ...floatingStyles, ...cssProps, ...styles }}
              {...floatingProps}
            >
              {children}
              <div className="access-hint-pop" ref={arrowRef} />
            </div>
          </FloatingDelayGroup>
        </FloatingPortal>
      )}
    </div>
  );
}

function Simple({ children, className, cssProps }: SimpleHintProps) {
  return (
    <Hint
      className={className}
      cssProps={cssProps}
      floating={{
        offset: 15,
        padding: 5,
        placement: "top-start"
      }}
    >
      {children}
    </Hint>
  );
}

Hint.Simple = Simple;
