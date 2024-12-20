type CardImgProps = {
    img: string | undefined;
};

export const CardImg = ({ img }: CardImgProps) => {
    return <img style={{ width: 200, height: 150 }} src={img} alt="img" />;
};
