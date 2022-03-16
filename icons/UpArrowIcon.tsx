
type Props = {
    color: string;
}

const UpArrowIcon = ({color}: Props) => (
    <svg viewBox='0 0 24 24' width='24px' height='24px' xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" >
        <path fill={color} d="M11 2.206l-6.235 7.528-.765-.645 7.521-9 7.479 9-.764.646-6.236-7.53v21.884h-1v-21.883z" />
    </svg>
)

export default UpArrowIcon;