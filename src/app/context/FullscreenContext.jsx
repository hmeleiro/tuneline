import PropTypes from 'prop-types';
import fscreen from 'fscreen';
import {
  useMemo,
  useRef,
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from 'react';

const FullscreenContext = createContext();

export function useFullscreen() {
  return useContext(FullscreenContext);
}

export const FullscreenProvider = ({ children }) => {
  const fullscreenRef = useRef();
  const [active, setActive] = useState(false);
  useEffect(() => {
    const handleChange = () => {
      setActive(fscreen.fullscreenElement === fullscreenRef.current);
    };
    fscreen.addEventListener('fullscreenchange', handleChange);
    return () => fscreen.removeEventListener('fullscreenchange', handleChange);
  }, []);
  const enterFullscreen = useCallback(async () => {
    if (fscreen.fullscreenElement) {
      await fscreen.exitFullscreen();
    }
    return fscreen.requestFullscreen(fullscreenRef.current);
  }, []);
  const exitFullscreen = useCallback(async () => {
    if (fscreen.fullscreenElement === fullscreenRef.current) {
      return fscreen.exitFullscreen();
    }
  }, []);
  const context = useMemo(() => {
    return {
      fullscreenRef,
      fullscreenEnabled: fscreen.fullscreenEnabled,
      fullscreenActive: active,
      enterFullscreen,
      exitFullscreen,
    };
  }, [active, enterFullscreen, exitFullscreen]);
  return (
    <FullscreenContext.Provider value={context}>
      {children}
    </FullscreenContext.Provider>
  );
};

FullscreenProvider.propTypes = {
  children: PropTypes.node,
};
