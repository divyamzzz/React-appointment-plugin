import * as React from 'react';


export function createAppointmentClient(opts?: { baseURL?: string; defaultHeaders?: Record<string,string> }): {
getResources: () => Promise<any>;
createAppointment: (payload: any) => Promise<any>;
};


export const AppointmentProvider: React.FC<{ baseURL?: string; defaultHeaders?: Record<string,string>; client?: any }>;
export function useAppointment(): { client: any };
export const AppointmentForm: React.FC<{ orgId?: number | string; onSuccess?: (res:any)=>void; onError?: (err:any)=>void; className?: string }>;


export const AppointmentCard: React.FC<{
title?: string;
subtitle?: string;
cardClassName?: string;
wrapperClassName?: string;
style?: React.CSSProperties;
formProps?: Record<string, any>;
}>;