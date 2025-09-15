import React, { createContext, useContext, useMemo } from 'react';
import { createAppointmentClient } from './client';

const AppointmentContext = createContext(null);

export function AppointmentProvider({ children, baseURL = '', defaultHeaders = {}, client: clientProp = null }) {
  const client = useMemo(() => clientProp || createAppointmentClient({ baseURL, defaultHeaders }), [baseURL, defaultHeaders, clientProp]);
  return <AppointmentContext.Provider value={{ client }}>{children}</AppointmentContext.Provider>;
}

export function useAppointment() {
  const ctx = useContext(AppointmentContext);
  if (!ctx) throw new Error('useAppointment must be used within AppointmentProvider');
  return ctx;
}
