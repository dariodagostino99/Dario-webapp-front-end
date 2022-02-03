import exp from "constants";
import {Simulate} from "react-dom/test-utils";
import click = Simulate.click;

type Props = {
    selected: boolean;
}

const TaskIcon = ({ selected }: Props) => (
    <svg viewBox='0 0 24 24' width='24px' height='24px' xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <path fill={selected ? "black" : "white"} d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24zm-4 7h-8v1h8v-1zm0 5h-8v1h8v-1zm0 5h-8v1h8v-1zm-10.516-11.304l-.71-.696-2.553 2.607-1.539-1.452-.698.71 2.25 2.135 3.25-3.304zm0 5l-.71-.696-2.552 2.607-1.539-1.452-.698.709 2.249 2.136 3.25-3.304zm0 5l-.71-.696-2.552 2.607-1.539-1.452-.698.709 2.249 2.136 3.25-3.304z" />
    </svg>
)

export default TaskIcon;