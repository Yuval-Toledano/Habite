import styled from 'styled-components';
import Icecream from "../../images/candy_svgs/Icecream.svg";
import BeerBottle from "../../images/candy_svgs/BeerBottle.svg";

const px = "px";
const rem = "rem";
const shadow = "-2px 4px 0px rgba(160, 160, 160, 0.25)";

const colors = {
    main_cta: "#E71C7D", bg: "#FAF0E4", text: "#333331", accent: "#F8F7F5", link: "#00397B",
    shadow_main: "#E993B1", shadow_orange: "#F16643", shadow_teal: "#0891A8", shadow_yellow: "#FBE536",
    pink_hover: "#FD35BD", light_gray: "#D8D8D8", dark_gray: "#666662"
};

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