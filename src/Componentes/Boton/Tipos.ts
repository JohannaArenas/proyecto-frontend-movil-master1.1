//import {FormEvent} from 'react';

export interface Props {
  text?: string;
  //textStyle?: any;
  type?: buttonType;
  style?: any;
//  onPress?: (e?: FormEvent<HTMLFormElement> | undefined) => void;
//  disabled?: boolean;
//  loading?: boolean;
//  iconLeft?: JSX.Element;
}

export type buttonType = 'principal' | 'secundario' | 'aceptar' | 'cancelar';