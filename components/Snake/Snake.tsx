import {Box} from "@chakra-ui/react";

type Props = {
    dots: any[];
}

const Snake = ({ dots }: Props) => {
    return(
        <Box>
            {dots.map((d, i) => (
                <Box key={i}
                     left={`${d[0]}%`}
                     top={`${d[1]}%`}
                     position={"absolute"}
                     width={"2%"}
                     height={"2%"}
                     backgroundColor={"black"}
                     zIndex={2}
                />
            ))}
        </Box>
    )
}

export default Snake;