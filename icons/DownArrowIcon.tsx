
type Props = {
    color: string;
}

const DownArrowIcon = ({color}: Props) => (
    <svg viewBox='0 0 24 24' width='24px' height='24px' xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" >
        <path fill={color} d="M11 21.883l-6.235-7.527-.765.644 7.521 9 7.479-9-.764-.645-6.236 7.529v-21.884h-1v21.883z" />
    </svg>
)

export default DownArrowIcon;