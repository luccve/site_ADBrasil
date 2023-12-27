import { createContext, useState } from 'react';

import type { MyContextProps } from '../@types/data';


export const ContextMap = createContext<MyContextProps | null>({
  ID: undefined,
  url: undefined,
  color: undefined,
  Ordem: undefined,
  Subordem: undefined,
  Textura: undefined,
  AD: undefined,
  Relevo: undefined,
  Latitude: undefined,
  Longitude: undefined,
});




function ContextMapProvider({ children }: { children: React.ReactNode }) {
  const [context, setContext] = useState<MyContextProps>({});


  return (
    <ContextMap.Provider value={{ ...context, setContext }}>
      {children}
    </ContextMap.Provider>
  );
}


export default ContextMapProvider;

