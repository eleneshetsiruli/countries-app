type CardTitleProps = {
  title: string | undefined;
};

export const CardTitle = ({ title }: CardTitleProps) => {
  return <h1>{title}</h1>;
};
