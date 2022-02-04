import {Box, Flex, Heading, Text} from "@chakra-ui/react";
import Snake from "../components/Snake";
import Food from "../components/Food";
import {useEffect, useState} from "react";
import ActionButton from "../components/ActionButton";
import ReturnIcon from "../icons/ReturnIcon";


const SnakeGame = () => {
    const [direction, setDirection] = useState("RIGHT")
    const [score, setScore] = useState(0);
    const [snake, setSnake] = useState([
        [0,0],
        [2,0]
    ]);
    const [food, setFood] = useState([]);
    const [isGameOver, setIsGameOver] = useState(false)
    const [speed, setSpeed] = useState(100);

    const onPlayAgain = () => {
        setSnake([
            [0,0],
            [2,0]
        ]);
        setSpeed(100);
        setScore(0);
        setIsGameOver(false);
        setDirection("RIGHT");
        setFood(spawnFood());
    }

    const onKeyDown = (e) => {
        e = e || window.event;
        switch (e.keyCode){
            case 38:
                setDirection("UP");
                break;
            case 40:
                setDirection("DOWN");
                break;
            case 37:
                setDirection("LEFT");
                break;
            case 39:
                setDirection("RIGHT");
                break;
        }
    }

    const moveSnake = () => {
        let dots = [...snake];
        let head = dots[dots.length - 1];
        switch (direction){
            case "RIGHT":
                head = [head[0] + 2, head[1]];
                break;
            case "LEFT":
                head = [head[0] - 2, head[1]];
                break;
            case "DOWN":
                head = [head[0], head[1] + 2];
                break;
            case "UP":
                head = [head[0], head[1] - 2];
                break;
        }
        dots.push(head);
        dots.shift();
        setSnake(dots);
    }

    const checkIfOutOfBounds = () => {
        const head = snake[snake.length - 1];
        if (head[0] >= 99 || head[1] >= 99 || head[0] < 0 || head[1] < 0){
            setIsGameOver(true);
        }
    }

    const enlargeSnake = () => {
        let newSnake = [...snake];
        newSnake.unshift([]);
        setSnake(newSnake);
    }

    const checkIfEats = () => {
        let head = snake[snake.length - 1];
        let foodPosition = food;
        if (head[0] === foodPosition[0] && head[1] === foodPosition[1]){
            setFood(spawnFood());
            setScore((prev) => prev + 1);
            enlargeSnake();
            increaseSpeed();
        }
    }

    const increaseSpeed = () => {
        if (speed > 50){
            setSpeed((prev) => prev - 10)
        }
    }

    const checkIfCollapsed = () => {
        let snakePos = [...snake];
        let head = snakePos[snakePos.length - 1];
        snakePos.pop();
        snakePos.forEach((d) => {
            if (head[0] === d[0] && head[1] === d[1]){
                setIsGameOver(true);
            }
        })
    }

    useEffect(() => {
        setFood(spawnFood());
        document.onkeydown = onKeyDown;
    }, [])

    useEffect(() => {
        if (!isGameOver){
            const interval = setInterval(() => {
                moveSnake();
            }, speed);
            return () => clearInterval(interval);
        }
    })

    useEffect(() => {
        checkIfOutOfBounds();
        checkIfCollapsed();
        checkIfEats();
    })

    const spawnFood = () => {
        const max = 1;
        const min = 98;
        const x = Math.floor((Math.random() * (max - min + 1) + min) / 2 ) * 2;
        const y = Math.floor((Math.random() * (max - min + 1) + min) / 2 ) * 2;
        return [x, y];
    }

    return(
        <>
            <Text fontSize={20} mb={2}>{`Score: ${score}`}</Text>
            <Box width={"800px"} height={"800px"} border={"solid"} borderColor={"black"} position={"relative"} alignItems={"center"}>
                <Snake dots={snake}/>
                <Food dots={food} />
                {isGameOver && (
                    <Flex justifyContent={"center"} direction={"column"} textAlign={"center"} alignContent={"center"} alignItems={"center"}>
                        <Heading color={"red"} alignItems={"center"} mt={300}>You Lose!</Heading>
                        <Text ml={5} mb={3} fontSize={30} textAlign={"center"} >Your score was: {score}</Text>
                        <ActionButton children={<ReturnIcon />} onClick={onPlayAgain} style={"return"} />
                    </Flex>
                )}
            </Box>
        </>
    )
}

export default SnakeGame;