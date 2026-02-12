import React from 'react';

export interface NavItem {
  label: string;
  id: ViewState;
  icon?: React.ReactNode;
}

export enum ViewState {
  HOME = 'HOME',
  GENERATOR = 'GENERATOR',
  EVENTS = 'EVENTS',
  PRAYER = 'PRAYER',
}

export interface AnniversaryEvent {
  id: string;
  title: string;
  date: string;
  month: string;
  description?: string;
}