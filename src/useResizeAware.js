// @flow
import * as React from 'react';
import ResizeListener from './ResizeListener';

const defaultReporter = (target) => ({
  width: target != null ? target.offsetWidth : null,
  height: target != null ? target.offsetHeight : null,
});

export default function useResizeAware(
  reporter = defaultReporter
) {
  const [sizes, setSizes] = React.useState({ width: null, height: null });
  const onResize = React.useCallback(ref => setSizes(reporter(ref.current)), [
    reporter,
  ]);
  const resizeListenerNode = React.useMemo(
    () => <ResizeListener onResize={onResize} />,
    [onResize]
  );

  return [resizeListenerNode, sizes];
}
