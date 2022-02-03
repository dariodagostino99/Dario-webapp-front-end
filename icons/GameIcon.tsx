import exp from "constants";

type Props = {
    selected: boolean;
}

const AddIcon = ({ selected }) => (
    <svg viewBox='0 0 24 24' width='24px' height='24px' xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" >
        <path fill={selected ? "black" : "white"} d="M6 2l1.172.203c-.356 2.245.791 2.519 2.697 2.874 1.469.273 3.131.622 3.131 3.284v.639h-1.183v-.639c0-1.556-.479-1.809-2.163-2.122-2.584-.48-4.097-1.391-3.654-4.239zm-.176 10c-2.108 0-3.824 1.794-3.824 4s1.716 4 3.825 4c.928 0 1.825-.354 2.524-.999 1.015-.933 2.323-1.447 3.684-1.447 1.337 0 2.611.505 3.589 1.423.704.659 1.611 1.023 2.553 1.023 2.109 0 3.825-1.794 3.825-4 0-2.151-1.602-3.906-3.652-4h-12.524zm.001-2l12.563.007c3.118.116 5.612 2.755 5.612 5.993 0 3.312-2.607 6-5.825 6-1.511 0-2.886-.595-3.921-1.565-.637-.597-1.429-.881-2.221-.881-.838 0-1.676.318-2.329.919-1.03.948-2.389 1.527-3.879 1.527-3.218 0-5.825-2.688-5.825-6s2.607-6 5.825-6zm3.175 5h-2v-2h-2v2h-2v2h2v2h2v-2h2v-2zm4 1h-2v1h2v-1zm4-2c0 .552.447 1 1 1s1-.448 1-1-.447-1-1-1-1 .448-1 1zm0 2c0-.552-.447-1-1-1s-1 .448-1 1 .447 1 1 1 1-.448 1-1zm2 2c0-.552-.447-1-1-1s-1 .448-1 1 .447 1 1 1 1-.448 1-1zm2-2c0-.552-.447-1-1-1s-1 .448-1 1 .447 1 1 1 1-.448 1-1z" />
    </svg>
)

export default AddIcon;