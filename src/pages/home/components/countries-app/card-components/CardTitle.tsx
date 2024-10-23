type CardTitleProps = {
  title: string | undefined;
};

export const CardTitle = ({ title }: CardTitleProps) => {
  return title ? <h1>{title}</h1> : null;
};
