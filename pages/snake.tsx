import {Box, Button, Flex, Heading, Text, useToast} from "@chakra-ui/react";
import Snake from "../components/Snake/Snake";
import Food from "../components/Snake/Food";
import {useEffect, useState} from "react";
import ActionButton from "../components/Buttons/ActionButton";
import ReturnIcon from "../icons/ReturnIcon";
import {useForm} from "react-hook-form";
import useAuthorization from "../hooks/useAuthorization";
import {router} from "next/client";


const SnakeGame = () => {
    const [direction, setDirection] = useState("RIGHT")
    const [score, setScore] = useState(0);
    const {handleSubmit} = useForm();
    const [snake, setSnake] = useState([
        [0,0],
        [2,0]
    ]);
    const [food, setFood] = useState([]);
    const [isGameOver, setIsGameOver] = useState(false)
    const [speed, setSpeed] = useState(100);
    const { user } = useAuthorization();
    const toast = useToast()
    const [submitted, setSubmitted] = useState(false);

    const onSubmitScore = () => {
        const options = {
            method: "POST",
            body: JSON.stringify({user, score}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
        fetch("http://localhost:8080/v1/snakeGame", options)
            .then((data) => {
                if (data.ok){
                    toast({
                        title: "Score submitted",
                        description: "Your score was submitted successfully!",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                        position: "top-right"
                    })
                    setSubmitted(true);
                } else {
                    toast({
                        title: "Internal server error!",
                        description: "The score was not submitted, try again later.",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                        position: "top-right"
                    })
                }
            })
    }

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
        setSubmitted(false);
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
            <Flex justifyContent={"space-between"} alignContent={"center"} alignItems={"center"} width={"300px"}>
                <Text fontSize={20} mb={2}>{`Score: ${score}`}</Text>
                <Button mb={2} _hover={{backgroundColor: "#647394", color: "white"}} onClick={() => router.push("/snake-leaderboard")}>See Leaderboard</Button>
            </Flex>
            <Box width={"800px"} height={"800px"} border={"solid"} borderColor={"black"} position={"relative"} alignItems={"center"}>
                <Snake dots={snake}/>
                <Food dots={food} />
                {isGameOver && (
                    <Flex justifyContent={"center"} direction={"column"} textAlign={"center"} alignContent={"center"} alignItems={"center"} padding={60}>
                        <Box border={"solid"} padding={10} backgroundColor={"#9E496D"} position={"absolute"} zIndex={10}>
                            <Heading color={"#2C262D"} alignItems={"center"}>You Lose!</Heading>
                            <Text ml={5} mb={3} fontSize={30} textAlign={"center"} >Your score was: {score}</Text>
                            <Flex direction={"row"} justifyContent={"space-evenly"}>
                                <ActionButton children={<ReturnIcon />} onClick={onPlayAgain} style={"return"} />
                                {user && !submitted && (
                                    <Button onClick={handleSubmit(onSubmitScore)} _hover={{backgroundColor:"#647394", color: "white"}}>Submit</Button>
                                )}
                            </Flex>
                        </Box>
                    </Flex>
                )}
            </Box>
        </>
    )
}

export default SnakeGame;