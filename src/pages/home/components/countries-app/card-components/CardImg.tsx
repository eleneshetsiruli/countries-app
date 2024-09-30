type CardImgProps = {
  img: string;
};

export const CardImg = ({ img }: CardImgProps) => {
  return <img src={img} alt="img" />;
};
