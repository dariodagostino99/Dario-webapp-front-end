import {Box} from "@chakra-ui/react";

type Props = {
    dots: any[],
}

const Food = ({ dots }) => {
    return (
        <Box backgroundColor={"red"}
             left={`${dots[0]}%`}
             top={`${dots[1]}%`}
             position={"absolute"}
             width={"2%"}
             height={"2%"}
             zIndex={1}
        />
    )
}

export default Food;