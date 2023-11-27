export interface Props {
    placeholder?: string;
    //textStyle?: any;
    type?: inputType;
    style?: any;
  //  onPress?: (e?: FormEvent<HTMLFormElement> | undefined) => void;
  //  disabled?: boolean;
  //  loading?: boolean;
    icono: JSX.Element;
  }
  
  export type inputType = 'normal' | 'contraseña';