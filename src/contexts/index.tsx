import { createContext, useState } from 'react';

import type { GeoInfoData } from '../@types/data';


export const ContextMap = createContext<GeoInfoData | null>(null);




function ContextMapProvider({ children }: { children: React.ReactNode }) {
  const [context, setContext] = useState<GeoInfoData | null>(null);


  return (
    <ContextMap.Provider value={{ ...context, setContext }}>
      {children}
    </ContextMap.Provider>
  );
}


export default ContextMapProvider;

