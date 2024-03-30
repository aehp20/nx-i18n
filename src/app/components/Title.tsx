import { ReactNode } from "react";

type TitleProps = {
  children: ReactNode;
}

export default function Title(props: TitleProps) {
  const { children } = props;

  return (
    <div className="flex">
      {children}
    </div>
  );
}
