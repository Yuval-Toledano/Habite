import styled from 'styled-components';
import Icecream from "../../images/candy_svgs/Icecream.svg";
import BeerBottle from "../../images/candy_svgs/BeerBottle.svg";

const px = "px";

const IcecreamWrapper = styled.img`
  height: ${({ height }) => (height ? height + px : 180 + px)};
  padding: 0.5rem 1rem;
`;

const BeerbottleWrapper = styled.img`
  height: ${({ height }) => (height ? height + px : 180 + px)};
  padding: 0.5rem 1rem;
`;

export function SvgIcecream(props) {
    const { height, alt } = props;

    return (
        <IcecreamWrapper src={Icecream} height={height} alt={alt}>

        </IcecreamWrapper>
    );
}

export function SvgBeerbottle(props) {
    const { height, alt } = props;

    return (
        <BeerbottleWrapper src={BeerBottle} height={height} alt={alt}>

        </BeerbottleWrapper>
    );
}