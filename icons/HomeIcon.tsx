import exp from "constants";

type Props = {
    selected: boolean;
}

const HomeIcon = ({ selected }: Props) => (
    <svg viewBox='0 0 24 24' width='24px' height='24px' xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" >
        <path fill={selected ? "black" : "white"} d="M20 7.093v-5.093h-3v2.093l3 3zm4 5.907l-12-12-12 12h3v10h18v-10h3zm-5 8h-14v-10.26l7-6.912 7 6.99v10.182zm-5-1h-4v-6h4v6z" />
    </svg>
)

export default HomeIcon;